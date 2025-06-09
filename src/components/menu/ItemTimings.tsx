import React, { useState } from 'react';

type AvailabilityOption = 'all_time' | 'same_time' | 'different_time';

const ItemTimings: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<AvailabilityOption>('all_time');

  return (
    <div className="max-w-xl text-sm text-gray-800 space-y-4 p-4">
      <p className="text-gray-600">
        Please specify the timings when this item will be available on Grabbzo.
        <br />
        <a href="#" className="text-blue-600 hover:underline">
          Each day can have only maximum of 3 timeslots
        </a>
      </p>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="radio"
            value="all_time"
            checked={selectedOption === 'all_time'}
            onChange={() => setSelectedOption('all_time')}
            className="mt-1"
          />
          <span>
            Item is available at <strong>all time when kitchen / restaurant is on Grabbzo</strong>
          </span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="radio"
            value="same_time"
            checked={selectedOption === 'same_time'}
            onChange={() => setSelectedOption('same_time')}
            className="mt-1"
          />
          <span>
            Item is available at <strong>same time for all days of the week</strong>
          </span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="radio"
            value="different_time"
            checked={selectedOption === 'different_time'}
            onChange={() => setSelectedOption('different_time')}
            className="mt-1"
          />
          <span>
            Item is available at <strong>different time during different days of the week</strong>
          </span>
        </label>
      </div>
    </div>
  );
};

export default ItemTimings;
