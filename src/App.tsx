
import "./index.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react";
import {
  Field
} from "@/components/ui/field"
import { H3 } from "./components/h3";
import { useEffect, useState } from "react";
import { ScrollArea } from "./components/ui/scroll-area";
import { db, useTasks } from "./lib/db";
import { Checkbox } from "./components/ui/checkbox";
import AppForm from "./components/appForm";
import AppTable from "./components/appTable";


export function App() {
  return (
    <>
      <H3 className="text-center">TO DO LIST</H3>
      <div className="container mx-auto p-8 text-center relative z-10">
        {/* Form */}
        <AppForm />
        {/* Table */}
        <AppTable />
      </div>
    </>
  );
}

export default App;
