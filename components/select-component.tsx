
import React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaPercent } from "react-icons/fa";
import { Label } from "./ui/label";

export default function SelectScrollable() {
    return <div>
        <Label htmlFor="">Weight</Label>
        <div className="flex gap-1 items-center">
            <Select>
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                        <SelectItem value="70">70</SelectItem>
                        <SelectItem value="80">80</SelectItem>
                        <SelectItem value="90">90</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FaPercent className="text-gray-300" />
        </div>
    </div>
}
