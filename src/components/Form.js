import React from 'react'

const Form = ({handleSubmit, value, setValue}) => {
    
    const handleChange = (e) => {
        setValue(e.target.value)
      };

    return (

        <form className='flex pt-2' onSubmit={handleSubmit}>
            <input
                type="text"
                name="value"
                className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
                placeholder="해야 할 일을 입력하세요."
                value={value}
                onChange={handleChange}   // 글씨 써지게
            />

            <input
                type="submit"
                value="입력"
                className='p-2 text-blue-400 border-2 border-blue-400 rounded
                hover:text-white hover:bg-blue-200'
            />
        </form>

    )
}

export default Form