"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useJobFilters } from "@/lib/hooks/jobs/use-job-filters";
import { SALARY_RANGE_OPTIONS, POPULAR_LOCATIONS } from "@/lib/constants/jobs";
import { cn } from "@/lib/utils";

interface JobsFilterProps {
  search: string;
  setSearch: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  salaryMin: number;
  setSalaryMin: (value: number) => void;
}

export function JobsFilter({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType,
  salaryMin,
  setSalaryMin,
}: JobsFilterProps) {
  const { data: filters, isLoading } = useJobFilters();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearch = () => {
    setSearch(localSearch);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Frontend Engineer..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="bg-black border-white/20 text-white placeholder:text-gray-600 pl-4 h-8 md:h-10 text-xs md:text-sm rounded-none focus-visible:ring-0 focus-visible:border-white transition-colors"
          />
        </div>
        <Button
          className="bg-white text-black hover:bg-gray-200 h-8 md:h-10 rounded-none px-6 font-mono text-xs md:text-sm"
          variant="default"
          onClick={handleSearch}
        >
          <Search className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 text-sm font-mono">
        <span className="text-gray-500">Filter by</span>

        <div className="flex flex-wrap gap-2">
          {/* Location Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "bg-transparent border-white/20 text-gray-300 hover:text-white hover:border-white hover:bg-transparent rounded-none h-8 md:h-10 text-xs md:text-sm gap-2",
                  location && "text-white border-white bg-white/5"
                )}
              >
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                {location || "Locations"}
                {location ? (
                  <div
                    role="button"
                    className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLocation("");
                    }}
                  >
                    <X className="w-3 h-3" />
                  </div>
                ) : (
                  <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#0A0A0A] border-white/20 text-white"
              align="start"
            >
              <DropdownMenuLabel>Select Location</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuRadioGroup
                value={location}
                onValueChange={setLocation}
              >
                <DropdownMenuRadioItem
                  value=""
                  className="focus:bg-white/10 focus:text-white cursor-pointer"
                >
                  Any Location
                </DropdownMenuRadioItem>
                {POPULAR_LOCATIONS.map((loc) => (
                  <DropdownMenuRadioItem
                    key={loc}
                    value={loc}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {loc}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Employment Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "bg-transparent border-white/20 text-gray-300 hover:text-white hover:border-white hover:bg-transparent rounded-none h-8 md:h-10 text-xs md:text-sm gap-2",
                  type && "text-white border-white bg-white/5"
                )}
              >
                <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                {type || "Employment Type"}
                {type ? (
                  <div
                    role="button"
                    className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setType("");
                    }}
                  >
                    <X className="w-3 h-3" />
                  </div>
                ) : (
                  <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#0A0A0A] border-white/20 text-white"
              align="start"
            >
              <DropdownMenuLabel>Select Type</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                <DropdownMenuRadioItem
                  value=""
                  className="focus:bg-white/10 focus:text-white cursor-pointer"
                >
                  Any Type
                </DropdownMenuRadioItem>
                {filters?.types.map((t) => (
                  <DropdownMenuRadioItem
                    key={t}
                    value={t}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {t}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Salary Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "bg-transparent border-white/20 text-gray-300 hover:text-white hover:border-white hover:bg-transparent rounded-none h-8 md:h-10 text-xs md:text-sm gap-2",
                  salaryMin > 0 && "text-white border-white bg-white/5"
                )}
              >
                <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                {salaryMin > 0
                  ? `> RM ${salaryMin.toLocaleString()}`
                  : "Salary Range"}
                {salaryMin > 0 ? (
                  <div
                    role="button"
                    className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSalaryMin(0);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </div>
                ) : (
                  <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-[#0A0A0A] border-white/20 text-white"
              align="start"
            >
              <DropdownMenuLabel>Minimum Salary</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuRadioGroup
                value={salaryMin.toString()}
                onValueChange={(v) => setSalaryMin(parseInt(v))}
              >
                {SALARY_RANGE_OPTIONS.map((opt) => (
                  <DropdownMenuRadioItem
                    key={opt.value}
                    value={opt.value.toString()}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {opt.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
