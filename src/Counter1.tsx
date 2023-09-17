import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter1.module.css';
import TextField from '@mui/material/TextField';

import SuperButton from './SuperButton';


type Counter1PropsType = {
    maxValue:number;
    minValue:number;
    onMaxValueChange:(value:number)=>void;
    onMinValueChange:(value:number)=>void;

    SetIncorrect:(value:boolean)=>void;
    incorrectMessage:boolean
    setEnterMessage:(value:boolean)=>void;
    error:boolean;
    setError:(value:boolean)=>void;
    setShowCounterScreen:()=>void;
}

export const Counter1 = (props:Counter1PropsType) => {
    let [innerMaxValue, setMaxValue] = useState<string>("5");
    let [innerMinValue, setMinValue] = useState<string>('0');
    let [disabledBut, setDisabledBut]=useState<boolean>(true);

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(e.currentTarget.value);
        props.setEnterMessage(true);
        props.SetIncorrect(false);
        setDisabledBut(false);
    };

    const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMinValue(e.currentTarget.value);
        props.setEnterMessage(true);
        setDisabledBut(false);
    };

    useEffect(() => {
        if (parseInt(innerMaxValue) <= parseInt(innerMinValue)) {
            props.SetIncorrect(true);
        } else {
            props.SetIncorrect(false);
        }
    }, [innerMaxValue, innerMinValue, props.SetIncorrect]);

    useEffect(() => {
        const savedMaxValue = localStorage.getItem('maxValue');
        const savedMinValue = localStorage.getItem('minValue');

        if (savedMaxValue && savedMinValue) {
            setMaxValue(savedMaxValue);
            setMinValue(savedMinValue);
        }
    }, []);

    const setRange = () => {
        const parsedMaxValue = JSON.parse(innerMaxValue);
        const parsedMinValue = JSON.parse(innerMinValue);

        props.onMinValueChange(parsedMinValue);
        props.onMaxValueChange(parsedMaxValue);

        localStorage.setItem('maxValue', JSON.stringify(parsedMaxValue));
        localStorage.setItem('minValue', JSON.stringify(parsedMinValue));

        props.setEnterMessage(false)
        props.setError(false);
        setDisabledBut(true);
        props.setShowCounterScreen()


    }



    return (
        <div className={s.container}>
            <div className={s.innerRectangle}>
                <div className={s.label}>
                    <span className={s.labelText1}>max value:</span>
                    <TextField
                        id="max-value-input"
                        label="Max Value"
                        variant="filled"
                        size="small"
                        type="number"
                        className={s.TextField}
                        error={props.incorrectMessage}
                        style={{
                            border: '2px solid #189ec6',
                            borderRadius: '5px',
                        }}
                        inputProps={{
                            style: !props.incorrectMessage ? { background: '#AAD7F5FF', color: '#000' }
                                : { background: 'red', color: '#000' },

                        }}
                        value={innerMaxValue}
                        onChange={onChangeMaxHandler}
                    />
                </div>
                <div className={s.label}>
                    <span className={s.labelText2}>start value:</span>
                    <TextField
                        id="start-value-input"
                        label="Start Value"
                        variant="filled"
                        size="small"
                        type="number"
                        className={s.TextField}
                        error={props.incorrectMessage}
                        style={{
                            border: '2px solid #189ec6',
                            borderRadius: '5px',
                        }}
                        inputProps={{
                            style: !props.incorrectMessage ? { background: '#AAD7F5FF', color: '#000' }
                                : { background: 'red', color: '#000' }
                        }}
                        value={innerMinValue}
                        onChange={onChangeMinHandler}
                    />
                </div>
            </div>
            <div className={s.buttonRectangle}>
                <SuperButton disabledBut={false} text={'SET'} onClickHandler={setRange} />
            </div>
        </div>
    );
};
