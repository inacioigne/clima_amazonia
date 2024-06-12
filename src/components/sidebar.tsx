"use client"
import {
    Divider,
    Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Button
} from "@mui/material/";
import ClimateLogo from './climate-logo';
import Link from 'next/link';
import { CssBaseline, AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { ImMenu3 } from "react-icons/im";
import { useState } from "react";
import BtnBacias from "./btnBacias";
import BtnMultimodelo from "./btnMultimodelo";

const bacias = [
    {
        id: 'abx',
        nome: "Abacaxis"
    },
    {
        id: 'abr',
        nome: "Amazonas (BR)"
    },
    {
        "id": "ape",
        "nome": "Amazonas (PE)"
    },
    {
        "id": "ari",
        "nome": "Aripuanã"
    },
    {
        "id": "ben",
        "nome": "Beni"
    },
    {
        "id": "bra",
        "nome": "Branco"
    },
    {
        "id": "coa",
        "nome": "Coari"
    },
    {
        "id": "cur",
        "nome": "Curuá Una"
    }
]

const DrawerList = (
<div className="px-3">
    <BtnBacias />
    <Divider />
    <BtnMultimodelo />
</div>)

export default function SideBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false)
    if (isMobile) {
        const toggleDrawer = (newOpen: boolean) => () => {
            setOpen(newOpen);
        };
        return (
            <div className="flex justify-between items-center bg-blue-600">
                <Link
                    className="mb-2 flex h-20 items-end justify-start  p-4"
                    href="/">
                    <div className="flex w-32 text-white md:w-40">
                        <ClimateLogo />
                    </div>
                </Link>
                <IconButton aria-label="list"
                    onClick={toggleDrawer(true)}
                >
                    <ImMenu3 className="h-12 w-12 text-white px-2" />
                </IconButton>
                <Drawer open={open} anchor={'top'} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>

        )
    } else {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Link
                    className="mb-2 flex h-20 items-end justify-start bg-blue-600 p-4"
                    href="/"
                >
                    <div className="flex w-32 text-white md:w-40">
                        <ClimateLogo />
                    </div>
                </Link>
                {DrawerList}
            </Drawer>
        )
    }


}