import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { FC } from "react"
import { Themes, themes } from "~/constants/theme"

interface ListBoxProps {
    children: React.ReactNode,
    selectedValue: any,
    setSelectedValue: (arg0: any) => void,
    values: Themes
}

export const ListBox: FC<ListBoxProps> = ({children, selectedValue, setSelectedValue, values}) => {
    
    return (
        <Listbox value={selectedValue} onChange={setSelectedValue}>
            <Listbox.Button
                className={"flex items-center border border-gray-300 bg-white h-10 px-4 space-x-1.5 text-gray-600 rounded-3xl hover:bg-gray-200/30 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800"}>
                {children}
                <ChevronDownIcon className={"w-4 h-4"}/>
            </Listbox.Button>
            <Listbox.Options
                className={"absolute top-full right-0 mt-8 lg:mt-8 w-36 bg-white rounded-lg py-1 shadow-xl overflow-hidden dark:text-gray-300 dark:bg-gray-800"}>
                {Object.values(themes).map((value) => (
                    <Listbox.Option
                        key={value.id}
                        value={value}
                    >
                        {({active, selected}) => (
                            <div
                                className={`px-2 py-1 cursor-pointer 
                                ${active ? "bg-gray-100 dark:bg-gray-700 " : ""}
                                ${selected ? "text-blue-600 dark:text-sky-500" : ""}`}
                            >
                                <div className={"flex capitalize"}>
                                    <value.Icon className={"w-6 h-6 mr-2"}/>
                                    {value.title}
                                </div>
                            </div>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}