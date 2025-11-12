import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface StudentSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function StudentSelector({ value, onValueChange }: StudentSelectorProps) {
  const [open, setOpen] = useState(false);

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: api.getStudents,
  });

  const students = studentsData?.students || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-md justify-between bg-card"
        >
          {value ? value : "Select student..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-0 bg-popover z-50" align="start">
        <Command>
          <CommandInput placeholder="Search student ID..." />
          <CommandEmpty>
            {isLoading ? "Loading students..." : "No student found."}
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {students.map((studentId) => (
              <CommandItem
                key={studentId}
                value={studentId}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === studentId ? "opacity-100" : "opacity-0"
                  )}
                />
                {studentId}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
