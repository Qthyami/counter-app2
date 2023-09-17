import React, { useEffect, useState } from 'react';
import s from './Counter2.module.css';
import SuperButton from "./SuperButton";
import { Container, Grid } from "@mui/material";

type Counter2PropsType = {
    maxValue: number;
    minValue: number;
    incorrectMessage: boolean;
    enterMessage: boolean;
    setError: (value: boolean) => void;
    error: boolean;
    setShowCounterScreen: () => void;
}

export const Counter2 = (props: Counter2PropsType) => {
    let [value, setValue] = useState<number>(props.minValue);

    useEffect(() => {
        const savedValue = localStorage.getItem('counterValue');
        if (savedValue) {
            setValue(JSON.parse(savedValue));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [value]);

    useEffect(() => {
        if (value < props.minValue || value > props.maxValue) {
            setValue(props.minValue);
        }
    }, [value, props.minValue, props.maxValue]);

    useEffect(() => {
        if (value === props.maxValue) {
            props.setError(true);
        }
    }, [value]);

    function IncHandler() {
        if (props.incorrectMessage || props.enterMessage) {
            return;
        }
        if (value < props.maxValue) {
            setValue(value + 1);
        }
    }

    const Ekran = () => {
        if (props.incorrectMessage) {
            return <div style={{ color: 'red' }}>Incorrect value!</div>;
        }
        if (props.enterMessage) {
            return <div style={{ fontSize: 15 }}>Enter values and press 'SET'</div>;
        } else {
            return <div>{value}</div>;
        }
    }

    const ResetHandler = () => {
        setValue(props.minValue);
        props.setError(false)
    }

    const SetHandler = () => {
        props.setShowCounterScreen()
    }

    return (
        <div className={s.container}>
            <div className={props.error ? s.innerRectangleERROR : s.innerRectangle}>{Ekran()}</div>
            <div className={s.buttonRectangle}>
                <Container fixed>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={4}>
                            <SuperButton onClickHandler={IncHandler} disabledBut={(props.error || props.enterMessage)} text={"INC"} />
                        </Grid>
                        <Grid item xs={4}>
                            <SuperButton onClickHandler={ResetHandler} disabledBut={props.enterMessage} text={"RESET"} />
                        </Grid>
                        <Grid item xs={4}>
                            <SuperButton onClickHandler={SetHandler} disabledBut={props.enterMessage} text={"SET"} />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};
