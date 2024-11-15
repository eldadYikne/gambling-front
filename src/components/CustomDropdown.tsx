import { Dropdown } from "rsuite";
import { DropdownOption } from "../types/dropdown";
import { useState } from "react";

function CustomDropdown(props: Props) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("value", value);
    props.setOption(props.options.find((option) => option.key === value));
  };
  return (
    <div className="w-24">
      <Dropdown
        onSelect={handleSelect}
        className=" dropdown"
        title={props.title}
      >
        {props.options.map((option) => {
          return (
            <Dropdown.Item key={option.key} eventKey={option.key}>
              <span
                className={`${
                  selectedValue === option.key ? "text-green-500" : ""
                }`}
              >
                {option.text}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
interface Props {
  title: string;
  options: DropdownOption[];
  setOption: Function;
}
