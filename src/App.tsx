import React, {useState} from 'react';
import s from './App.module.css';
import { Counter1 } from "./Counter1";
import { Counter2 } from "./Counter2";
import { Container, Grid, Paper } from "@mui/material";

function App() {
    const [showCounterScreen, setShowCounterScreen] = useState(true);
    let [maxValue, setMaxValue] = useState<number>(5);
    let [minValue, setMinValue] = useState<number>(0);
    let[incorrectMessage, SetIncorrect] = useState<boolean>(false)
    let [enterMessage, setEnterMessage] = useState<boolean>(false)
    let [error,setError]=useState<boolean>(false)

    const handleMaxValueChange = (value:number) => {
        setMaxValue(value);
    };

    const handleMinValueChange = (value:number) => {
        setMinValue(value)
    };

    return (
        <div className={s.App}>
            <Container fixed>
                <Grid container spacing={12} justifyContent="center" alignItems="center">
                    {showCounterScreen ? (
                        <Grid item xs={5}>
                            <Paper style={{ padding: '30px', background: "#383232" }}>
                                <Counter2
                                    maxValue={maxValue}
                                    minValue={minValue}
                                    incorrectMessage={incorrectMessage}
                                    enterMessage={enterMessage}
                                    setError={setError}
                                    error={error}
                                    setShowCounterScreen={()=>setShowCounterScreen(!showCounterScreen)}
                                />
                            </Paper>
                        </Grid>
                    ) : (

                        <Grid item xs={5}>
                            <Paper style={{padding: '50px', background: "#383232"}}>
                                <Counter1
                                    maxValue={maxValue}
                                    minValue={minValue}
                                    onMaxValueChange={handleMaxValueChange}
                                    onMinValueChange={handleMinValueChange}

                                    SetIncorrect={SetIncorrect}
                                    incorrectMessage={incorrectMessage}
                                    setEnterMessage={setEnterMessage}
                                    error={error}
                                    setError={setError}
                                    setShowCounterScreen={()=>setShowCounterScreen(!showCounterScreen)}

                                />
                            </Paper>
                        </Grid>
                        ) }
                </Grid>
            </Container>
        </div>
    );
}

export default App;