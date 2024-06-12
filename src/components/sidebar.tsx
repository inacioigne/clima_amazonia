"use client"

import Link from 'next/link';
import ClimateLogo from './climate-logo';
import NavLinks from './nav-links';
import { Typography, Divider, List, ListItem, ListItemText, ListItemButton, Drawer, Button } from '@mui/material';
import { useState } from 'react';

const bacias = [
  {
    id: 'abx',
    nome: "Abacaxis"
  },
  {
    id: 'abr',
    nome: "Amazonas (BR)"
  }
]


export default function SideNav() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<"left" | "bottom" | "right" | "top" | undefined>("left");

  const toggleDrawer = (newOpen: boolean) => () => {
    setAnchor("top")
    setOpen(newOpen);

  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-5">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className="flex w-32 text-white md:w-40">
          <ClimateLogo />
        </div>
      </Link>
      <div className="hidden  md:block">
      <Typography variant="h6" gutterBottom>
        Bacias
      </Typography>
      <List>
        {
          bacias.map((bacia, index) => (
            <Link key={index} href={`/bacia/${bacia.id}`}>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemText primary={bacia.nome} />
              </ListItemButton>
            </ListItem>
            </Link>
            
          ))
        }
      </List>
      </div>
      <Button className="block md:hidden"
        onClick={toggleDrawer(true)}>Bacias</Button>
      <Divider />
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List>
          {
            bacias.map((bacia, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={bacia.nome} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Drawer>




    </div>
  );
}
