"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../UI/Input";
import { LinkFranchise, getFranchises } from "@/helpers/api-utils";
import { Button } from "../UI/Button";
import { useRouter } from "next/navigation";

const SelectFranchise = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [franchises, setFranchises] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [customFranchise, setCustomFranchise] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 2) {
        setShowSuggestions(true);
        const fetchFranchises = async () => {
          try {
            const response = await getFranchises(searchTerm);
            setFranchises(response || []);
          } catch (error) {
            console.error("Failed to fetch franchises", error);
          }
        };
        fetchFranchises();
      } else {
        setFranchises([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelectFranchise = (franchise: string) => {
    setSelectedItem(franchise);
    setSearchTerm(franchise);
    setShowSuggestions(false);
  };

  const handleProceed = async () => {
    const franchiseName = selectedItem || customFranchise;
    const isFranchise = !!selectedItem;

    try {
      await LinkFranchise(franchiseName, isFranchise);
      router.push("/details/information");
    } catch (error) {
      console.error("Error linking franchise", error);
    }
  };

  const handleCustomFranchiseClick = () => {
    setShowCustomInput(true);
    setCustomFranchise(searchTerm);
    setShowSuggestions(false);
  };

  return (
    <div className="my-4 relative w-[400px] mx-8" ref={suggestionsRef}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Franchise..."
        className="w-full"
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
          {franchises.length > 0 ? (
            franchises.map((franchise, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onMouseDown={() => handleSelectFranchise(franchise)}
              >
                {franchise}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
          {!showCustomInput && franchises.length === 0 && (
            <div className="p-2 border-t border-gray-200">
              <button
                className="w-full text-left p-2 text-blue-500 hover:bg-gray-100"
                onClick={() => handleCustomFranchiseClick()}
              >
                + Cant Find "{searchTerm}"? Create a custom franchise
              </button>
            </div>
          )}
        </div>
      )}

      <Button
        className="flex justify-center items-center text-white mt-24 w-full text-[20px] py-4"
        onClick={handleProceed}
        disabled={!selectedItem && !customFranchise} 
      >
        Proceed
      </Button>
    </div>
  );
};

export default SelectFranchise;
