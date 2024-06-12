"use client"
import {
    Divider,
    Drawer, IconButton, List, ListItem, MenuItem, Menu, Button
} from "@mui/material/";
import Link from "next/link";
import { useState } from "react";

export default function BtnMultimodelo() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="normal-case"
            >
                Previsão multimodelo
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                <Link href={`/forecast/seven`}>
                    <MenuItem onClick={handleClose}>7 Dias</MenuItem>
                </Link>
                <Link href={`/forecast/fourteen`}>
                    <MenuItem onClick={handleClose}>14 Dias</MenuItem>
                </Link>
            </Menu>
        </div>
    )
}