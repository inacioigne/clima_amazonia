"use client"
import {
    Divider,
    Drawer, IconButton, List, ListItem, MenuItem, Menu, Button
} from "@mui/material/";
import Link from "next/link";
import { useState } from "react";

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

export default function BtnBacias() {
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
                Análise individual
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
                {bacias.map((bacia) => (
                    <Link href={`/bacia/${bacia.id}`}>
                    <MenuItem onClick={handleClose}>{bacia.nome}</MenuItem>
                    </Link>
                ))}
            </Menu>
        </div>
    )
}