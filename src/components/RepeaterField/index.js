import React from "react";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {get} from "lodash";

import { useStyles } from "./styles";
import Button from "../Button";

function RepeaterField(props) {
    const {
        fieldArray,
        fieldName,
        errors,
        register,
        minEntries,
        ...rest
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.CreateMarket__Sources}
             {...rest}>
            {fieldArray.fields.map((entry, index) => {
                return (
                    <div key={`${fieldName}-${index}`}
                         className={classes.FieldItem}>
                        <div className={classes.FieldItem__InputAction}>
                            <input type={'text'}
                                   key={entry.id}
                                   {...register(`${fieldName}.${index}.value`)}/>
                            {
                                (index === (minEntries-1)) && (
                                    <Button size={'medium'}
                                            color={'black'}
                                            onClick={() => {
                                                fieldArray.append({
                                                    value: ""
                                                });
                                            }}>
                                        <AddIcon></AddIcon>
                                    </Button>
                                )
                            }
                            {
                                index > (minEntries-1) && (
                                    <Button size={'medium'}
                                            color={'red'}
                                            onClick={() => {
                                                fieldArray.remove(index);
                                            }}>
                                        <DeleteIcon
                                            className={
                                                classes.RemoveSourceIcon
                                            }
                                        ></DeleteIcon>
                                    </Button>
                                )
                            }
                        </div>
                        {
                            get(errors, [`${fieldName}`, index, 'value', 'message']) && (
                                <div className={classes.FieldItem__Error}>
                                    {get(errors, [`${fieldName}`, index, 'value', 'message'])}
                                </div>
                            )
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default RepeaterField;
