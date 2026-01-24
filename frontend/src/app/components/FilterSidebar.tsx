import { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import { Button } from "@/app/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: GameFilters) => void;
  filters: GameFilters;
}

export interface GameFilters {
  platforms: string[];
  genres: string[];
  priceRange: [number, number];
  regions: string[];
}

const platforms = ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "Nintendo Switch"];
const genres = ["Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", "Racing", "Horror"];
const regions = ["Global", "Europe", "USA", "Asia"];

export function FilterSidebar({ onFilterChange, filters }: FilterSidebarProps) {
  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter((p) => p !== platform);
    onFilterChange({ ...filters, platforms: newPlatforms });
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    const newGenres = checked
      ? [...filters.genres, genre]
      : filters.genres.filter((g) => g !== genre);
    onFilterChange({ ...filters, genres: newGenres });
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter((r) => r !== region);
    onFilterChange({ ...filters, regions: newRegions });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearAllFilters = () => {
    onFilterChange({
      platforms: [],
      genres: [],
      priceRange: [0, 100],
      regions: [],
    });
  };

  const hasActiveFilters = 
    filters.platforms.length > 0 || 
    filters.genres.length > 0 || 
    filters.regions.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 100;

  return (
    <aside className="w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-900 mb-3 block">
          Price Range
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Platform */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-900 mb-3 block">
          Platform
        </Label>
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform}`}
                checked={filters.platforms.includes(platform)}
                onCheckedChange={(checked) => 
                  handlePlatformChange(platform, checked as boolean)
                }
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {platform}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-900 mb-3 block">
          Genre
        </Label>
        <div className="space-y-3">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={filters.genres.includes(genre)}
                onCheckedChange={(checked) => 
                  handleGenreChange(genre, checked as boolean)
                }
              />
              <Label
                htmlFor={`genre-${genre}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Region */}
      <div>
        <Label className="text-sm font-semibold text-gray-900 mb-3 block">
          Region
        </Label>
        <div className="space-y-3">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region}`}
                checked={filters.regions.includes(region)}
                onCheckedChange={(checked) => 
                  handleRegionChange(region, checked as boolean)
                }
              />
              <Label
                htmlFor={`region-${region}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
