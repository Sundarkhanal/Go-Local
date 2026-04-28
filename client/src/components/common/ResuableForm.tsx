import { useState } from "react"

interface Field{
    name: string,
    label?:string,
    type:"text" | "number" | "file" | "select",
    options?: any[]
}

interface IFormProps{
    fields:Field[],
    onSubmit: (data:any) => void,
    buttonText?: string
}

export const ResuableForm = ({fields, onSubmit, buttonText = "submit"}: IFormProps) => {
    const [form, setForm] = useState({})

    const handleChange = (e:any, field:Field) => {
        const {name, value, files} = e.target
        setForm({
            ...form,
            [name]: field.type === "file"? files[0]: value
        })
    };
    const handleSubmit = (e:any) => {
        e.preventDefault();
        onSubmit(form)
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field, i) => (
                <div key={i}>
                    {field.label && (
                        <label className="block mb-1 text-sm font-medium">
                            {field.label}
                        </label>
                    )}
                    {(field.type === "text" || field.type === "number") && (
                        <input 
                        type={field.type}
                        name={field.name}
                        onChange={(e) => handleChange(e, field)}
                        className="border p-2 rounded w-full"
                         />
                    )}
                    {field.type === "file" && (
                        <input
                        type="file"
                        name={field.name}
                        onChange={(e) => handleChange(e, field)}
                        className="border p-2 rounded w-full"
                        />
                    )}
                    {field.type === "select" && (
                        <select
                        name={field.name}
                        onChange={(e) => handleChange(e, field)}
                        className="border p-2 rounded w-full"
                        >
                        <option value="">Select</option>

                        {field.options?.map((opt: any) => (
                            <option key={opt._id} value={opt._id}>
                            {opt.name}
                            </option>
                        ))}
                        </select>
                    )}

                </div>
            ))}
            <button
                type="submit"
                className="bg-teal-600 text-white py-2 rounded cursor-pointer"
            >
                {buttonText}
            </button>
        </form>
    )


}
