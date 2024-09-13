

import React, { useState } from 'react'
import { Label } from './label';
import { Input } from './input';

function Radio() {
    const [selectedValue, setSelectedValue] = useState<string>('NOT REQUIRED');

    // Handle change event for the radio group
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return <>
        <div className="flex items-center space-x-4">

            {/* Radio button for "Required" */}
            <div className="flex items-center">
                <input
                    id="required"
                    type="radio"
                    name="plantModification"
                    value="REQUIRED"
                    checked={selectedValue === 'REQUIRED'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600  bg-gray-100 border-gray-300"
                />
                <label
                    htmlFor="required"
                    className="ml-2 text-sm font-medium text-gray-900"
                >
                    Required
                </label>
            </div>

            {/* Radio button for "Not Required" */}
            <div className="flex items-center">
                <input
                    id="not-required"
                    type="radio"
                    name="plantModification"
                    value="NOT REQUIRED"
                    checked={selectedValue === 'NOT REQUIRED'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                    htmlFor="not-required"
                    className="ml-2 text-sm font-medium text-gray-900"
                >
                    Not Required
                </label>
            </div>
        </div>
        {selectedValue === 'REQUIRED' && <><Label htmlFor='' >Add attachment</Label>
            <Input className='w-1/2' type='file' name='file' /></>}
    </>


}

export default Radio
