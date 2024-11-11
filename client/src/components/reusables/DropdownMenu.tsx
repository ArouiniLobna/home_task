import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

interface DropdownOption {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  buttonLabel: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  buttonLabel,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {buttonLabel}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="py-1">
          {options.map((option, index) => (
            <MenuItem key={index}>
              {({ active }) =>
                option.href ? (
                  <a
                    href={option.href}
                    className={`block px-4 py-2 text-sm text-gray-700 ${
                      active ? "bg-gray-100 text-gray-900" : ""
                    }`}
                  >
                    {option.label}
                  </a>
                ) : (
                  <button
                    onClick={option.onClick}
                    className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                      active ? "bg-gray-100 text-gray-900" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                )
              }
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
