import React, { useState, useEffect } from 'react';

type ItemPricingDetailsProps = {
  formData?: any;
  onFormDataChange?: (field: string, value: any) => void;
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const ItemPricingDetails: React.FC<ItemPricingDetailsProps> = ({
  formData,
  onFormDataChange,
  errors = {},
  setErrors,
}) => {
    // Use formData for price if available, otherwise default
    const price = formData?.price ? Number(formData.price) : 0;
    const [packaging, setPackaging] = useState<number>(0);
    const [gst, setGst] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0);

    useEffect(() => {
        const total = price + packaging + ((price + packaging) * gst) / 100;
        setFinalPrice(total);
    }, [price, packaging, gst]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (onFormDataChange) {
            onFormDataChange("price", value);
            if (setErrors) {
                setErrors((prev) => ({ ...prev, price: "" }));
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-gray-800 space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold">PRICE <span className="text-red-500">*</span></label>
                    {errors.price && (
                        <div className="text-red-500 text-[12px] mb-1">{errors.price}</div>
                    )}
                    <input
                        type="number"
                        value={price || ''}
                        onChange={handlePriceChange}
                        className="w-full border px-2 py-1 rounded"
                    />
                    <p className="text-xs text-gray-500">Excluding all taxes</p>
                </div>
                <div>
                    <label className="block text-sm font-semibold">PACKAGING <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        value={packaging}
                        onChange={(e) => setPackaging(Number(e.target.value))}
                        className="w-full border px-2 py-1 rounded"
                    />
                    <p className="text-xs text-gray-500">Excluding all taxes</p>
                </div>
                <div>
                    <label className="block text-sm font-semibold">GST <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        value={gst}
                        onChange={(e) => setGst(Number(e.target.value))}
                        className="w-full border px-2 py-1 rounded"
                    />
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded">
                <p className="text-sm font-semibold text-gray-700">Final Price</p>
                <p className="text-2xl font-bold text-blue-600">₹{finalPrice.toFixed(2)}</p>
                <p className="text-xs text-gray-600">Price + Packaging + GST</p>
                <div className="mt-2 bg-[#FFE5BC] border border-yellow-400 text-yellow-800 text-xs p-2 rounded">
                    Please ensure the item price matches the price in your menu to avoid rejection of changes
                </div>
            </div>
        </div>
    );
};

export default ItemPricingDetails;
