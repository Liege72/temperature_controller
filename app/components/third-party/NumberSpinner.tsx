"use client";

import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NumberSpinner({
    id: idProp,
    label,
    error,
    size = "medium",
    ...other
}: BaseNumberField.Root.Props & {
    label?: React.ReactNode;
    size?: "small" | "medium";
    error?: boolean;
}) {
    let id = React.useId();
    if (idProp) {
        id = idProp;
    }
    return (
        <BaseNumberField.Root
            {...other}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                    sx={{
                        "& .MuiButton-root": {
                            borderColor: "divider",
                            bgcolor: "#2A2A2A",
                            "&:active": {
                                bgcolor: "#1A1A1A",
                            },
                            "&:not(.Mui-disabled)": {
                                color: "#FFFFFF",
                            },
                        },
                    }}
                >
                    {props.children}
                </FormControl>
            )}
        >
            <Box sx={{ display: "flex" }}>
                <BaseNumberField.Decrement
                    render={
                        <Button
                            variant="outlined"
                            aria-label="Decrease"
                            size={size}
                            sx={{
                                borderRadius: "20px",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: "0px",
                                "&.Mui-disabled": {
                                    borderRight: "0px",
                                },
                                width: "25%",
                            }}
                        />
                    }
                >
                    <RemoveIcon fontSize={size} sx={{ color: "white" }} />
                </BaseNumberField.Decrement>

                <BaseNumberField.Input
                    id={id}
                    render={(props, state) => (
                        <OutlinedInput
                            inputRef={props.ref}
                            value={state.inputValue}
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                            onKeyUp={props.onKeyUp}
                            onKeyDown={props.onKeyDown}
                            onFocus={props.onFocus}
                            slotProps={{
                                input: {
                                    ...props,
                                    size:
                                        Math.max(
                                            (other.min?.toString() || "").length,
                                            state.inputValue.length || 1
                                        ) + 1,
                                    sx: {
                                        textAlign: "center",
                                    },
                                },
                            }}
                            sx={{
                                fontSize: "64px",
                                pr: 0,
                                borderRadius: 0,
                                flex: 1,
                                width: "50%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "divider",
                                    borderWidth: "1px",
                                },
                                "&:hover:not(.Mui-disabled)": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "divider",
                                    },
                                },
                                "&.Mui-focused": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "divider",
                                        borderWidth: "1px",
                                    },
                                },
                                "&.Mui-error, &.Mui-error:hover:not(.Mui-disabled), &.Mui-error.Mui-focused":
                                    {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "divider",
                                            borderWidth: "1px",
                                        },
                                    },
                            }}
                        />
                    )}
                />

                <BaseNumberField.Increment
                    render={
                        <Button
                            variant="outlined"
                            aria-label="Increase"
                            size={size}
                            sx={{
                                borderRadius: "20px",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderLeft: "0px",
                                "&.Mui-disabled": {
                                    borderLeft: "0px",
                                },
                                width: "25%",
                            }}
                        />
                    }
                >
                    <AddIcon
                        fontSize={size}
                        sx={{
                            color: "white",
                        }}
                    />
                </BaseNumberField.Increment>
            </Box>
        </BaseNumberField.Root>
    );
}
