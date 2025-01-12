import React, { useState } from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

// Dynamically generate timezone options
const timezones = Intl.supportedValuesOf("timeZone");
const timezoneOptions: Option[] = timezones.map((tz) => ({
  value: tz,
  label: tz.replace("_", " "),
}));

const TimezoneSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    timezoneOptions[0]
  );

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    console.log("Selected Timezone:", option?.value);
    // Trigger logic for the selected timezone if needed
  };

  return (
    <div>
      <h3>Select Timezone:</h3>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={timezoneOptions}
        placeholder="Choose a timezone"
        isSearchable
      />
    </div>
  );
};

export default TimezoneSelect;
