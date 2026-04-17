"use client";
import Image from "next/image";
import { Transportation } from "@/interface/Transportation";
import capitalize from "@/util/capitalize";
import { useState } from "react";

interface TransportCardProps {
  transport: Transportation;
  onDelete: (id: string,) => void;
  onEdit: (id:string,data:any) => void;
}

export default function TransportCard({ transport, onDelete,onEdit }: TransportCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: transport.name,
    providerName: transport.providerName,
    type: transport.type,
    description :transport.description,
    pickUpArea: {
      name: transport.pickUpArea?.name || "",
      address: {
        street: transport.pickUpArea?.address?.street || "",
        district: transport.pickUpArea?.address?.district || "",
        province: transport.pickUpArea?.address?.province || "",
        postalCode: transport.pickUpArea?.address?.postalCode || ""
      }
    },
    dropOffArea: {
      name: transport.dropOffArea?.name || "",
      address: {
        street: transport.dropOffArea?.address?.street || "",
        district: transport.dropOffArea?.address?.district || "",
        province: transport.dropOffArea?.address?.province || "",
        postalCode: transport.dropOffArea?.address?.postalCode || ""
      }
    },
    price: transport.price,
    img: transport.img,
    createAt:transport.createAt
  });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this transportation?")) return;
    onDelete(transport._id);
  };
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onEdit(transport._id,formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      handleCancel();
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setFormData({
      name: transport.name,
      providerName: transport.providerName,
      description :transport.description,
      price: transport.price,
      type: transport.type,
      pickUpArea: transport.pickUpArea,
      dropOffArea: transport.dropOffArea,
      img: transport.img,
      createAt:transport.createAt
    });
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLocationChange = (
    type: 'pickUpArea' | 'dropOffArea',
    field: string,
    value: string,
    isAddress: boolean = false
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...(isAddress
          ? { address: { ...prev[type].address, [field]: value } }
          : { [field]: value }),
      },
    }));
  };
  
  return (
    <div className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#30294d] dark:bg-[#25203e] dark:shadow-none md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-center">
      <div className="w-50 h-30 relative overflow-hidden rounded-xl bg-slate-100 dark:bg-[#312b50]">
        <Image
          src={transport.img}
          alt={transport.name}
          fill
          sizes="(max-width: 768px) 100vw, 170px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 space-y-1 ml-15 ">
        {isEditing ? (
          <>
            {/* --- โหมดแก้ไข (แสดง Input) --- */}
            <div className="flex gap-2">
              <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Name: </label>
              <input
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
              />
              <label className="font-medium text-slate-700 dark:text-[#f1eefc]">ProviderName: </label>
              <input
                name="providerName"
                value={formData.providerName} 
                onChange={handleChange}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Description : </label>
                <input 
                  name="description"
                  type="text"
                  value={formData.description||""}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                />
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">  Type : </label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                >
                  <option value="car">Car</option>
                  <option value="van">Van</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-medium text-slate-700 dark:text-[#f1eefc]">Price (฿) : </label>
                <input 
                  name="price"
                  type="number"
                  value={formData.price} 
                  onChange={handleChange}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <label  className="font-medium text-slate-700 dark:text-[#f1eefc]">Pick Up Details</label>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Location Name : 
                <input 
                  placeholder="Location Name" 
                  value={formData.pickUpArea.name} 
                  onChange={(e) => handleLocationChange('pickUpArea', 'name', e.target.value)} 
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-[#4a4365] dark:bg-[#312b50] dark:text-white" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Street : 
                <input 
                  placeholder="Street" 
                  value={formData.pickUpArea.address.street} 
                  onChange={(e) => handleLocationChange('pickUpArea', 'street', e.target.value, true)} 
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">District : 
                <input 
                  placeholder="District" 
                  value={formData.pickUpArea.address.district} 
                  onChange={(e) => handleLocationChange('pickUpArea', 'district', e.target.value, true)} 
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Province : 
                <input 
                  placeholder="Province" 
                  value={formData.pickUpArea.address.province} 
                  onChange={(e) => handleLocationChange('pickUpArea', 'province', e.target.value, true)} 
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Postal Code : 
                <input 
                  placeholder="Postal Code" 
                  value={formData.pickUpArea.address.postalCode} 
                  onChange={(e) => handleLocationChange('pickUpArea', 'postalCode', e.target.value, true)} 
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <label  className="font-medium text-slate-700 dark:text-[#f1eefc]">Drop Off Details</label>
              <div className="grid grid-cols-1 gap-2">
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Location Name : 
                <input 
                placeholder="Location Name" 
                value={formData.dropOffArea.name} 
                onChange={(e) => handleLocationChange('dropOffArea', 'name', e.target.value)} 
                className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-[#4a4365] dark:bg-[#312b50] dark:text-white" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Street : 
                <input 
                placeholder="Street" 
                value={formData.dropOffArea.address.street} 
                onChange={(e) => handleLocationChange('dropOffArea', 'street', e.target.value, true)} 
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">District : 
                <input 
                placeholder="District" 
                value={formData.dropOffArea.address.district} 
                onChange={(e) => handleLocationChange('dropOffArea', 'district', e.target.value, true)} 
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Province : 
                <input 
                placeholder="Province" 
                value={formData.dropOffArea.address.province} 
                onChange={(e) => handleLocationChange('dropOffArea', 'province', e.target.value, true)} 
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
                <div className="font-medium text-slate-700 dark:text-[#f1eefc]">Postal Code : 
                <input 
                placeholder="Postal Code" 
                value={formData.dropOffArea.address.postalCode} 
                onChange={(e) => handleLocationChange('dropOffArea', 'postalCode', e.target.value, true)} 
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-[#433b68] dark:bg-[#1f1a35] dark:text-[#f5f3ff] dark:focus:border-[#8c7fd0] dark:scheme-dark" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
          <h2 className="text-lg font-bold text-slate-900 dark:text-[#f5f3ff]">{transport.name} by {transport.providerName}</h2>
          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            {transport.description}
          </p>

          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">type : </span>
            {capitalize(transport.type)}
          </p>

          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">price : </span>
            {transport.price}฿
          </p>

          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">pick up : </span>
            {transport.pickUpArea.name} ({transport.pickUpArea.address.street}, {transport.pickUpArea.address.district}, {transport.pickUpArea.address.province} {transport.pickUpArea.address.postalCode})
          </p>

          <p className="text-sm text-slate-500 dark:text-[#c7c2dc]">
            <span className="font-medium text-slate-700 dark:text-[#f1eefc]">drop off : </span>
            {transport.dropOffArea.name} ({transport.dropOffArea.address.street}, {transport.dropOffArea.address.district}, {transport.dropOffArea.address.province} {transport.dropOffArea.address.postalCode})
          </p>
          </>
        )}
      </div>
      <div className="flex items-end justify-end gap-3 self-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0] dark:disabled:bg-[#4a4365]"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f] dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-indigo-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-[#6f648f] dark:hover:bg-[#7d72a0]"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400 dark:border-[#6f648f]  dark:bg-[#2c2649] dark:text-white dark:hover:bg-[#37305b] dark:disabled:border-[#4a4365] dark:disabled:bg-[#4a4365] dark:disabled:text-[#c3bdd7]"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
