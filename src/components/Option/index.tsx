import { Box, Typography } from "@mui/material";
import React from "react";

interface OptionProps {
    icon: string;
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}

const Option: React.FC<OptionProps> = ({
    icon,
    label,
    isSelected,
    onSelect,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                cursor: "pointer",
                padding: "10px",
                marginBottom: "10px",
                transition: "background-color 0.3s ease-in-out",
                marginRight: "10px",
            }}
            className={`option ${isSelected ? "selected" : ""}`}
            onClick={onSelect}
        >
            <Box className="left-half">
                <Typography
                    component="span"
                    className="icon"
                    sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "2rem",
                        },
                    }}
                >
                    {icon}
                </Typography>
            </Box>
            <Box className="right-half">
                <Typography
                    component="span"
                    sx={{
                        marginLeft: "10px",
                        fontSize: {
                            xs: "0.5rem",
                            sm: "1.2rem",
                        },
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                    className="label"
                >
                    {label}
                </Typography>
            </Box>
        </Box>
    );
};

export default Option;
