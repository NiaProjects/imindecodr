"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appointmentsApi, AppointmentFormData } from "@/lib/api";

interface MeetingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validate form data
      if (
        !formData.name ||
        !formData.phone ||
        !formData.date ||
        !formData.time
      ) {
        setError("Please fill in all fields");
        return;
      }

      // Map form data to API structure
      const apiData: AppointmentFormData = {
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
      };

      await appointmentsApi.submit(apiData);

      // Success
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
      });

      // Reset success message after 3 seconds and close form
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Error submitting appointment:", err);
      setError(
        err instanceof Error ? err.message : "Failed to book appointment"
      );

      // Reset error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-xl">
          <h2 className="text-2xl font-playfair font-bold text-amber-900">
            {isRTL ? "حجز ميتنج زوم" : "Book Zoom Meeting"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-100 rounded-full transition-colors text-amber-700 hover:text-amber-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-400 rounded-lg flex items-center gap-3 shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-700 flex-shrink-0" />
              <p className="text-green-900 font-semibold text-sm">
                {isRTL
                  ? "تم حجز الميتنج بنجاح! سنتواصل معك قريباً."
                  : "Meeting booked successfully! We'll contact you soon."}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-400 rounded-lg flex items-center gap-3 shadow-sm">
              <AlertCircle className="h-5 w-5 text-red-700 flex-shrink-0" />
              <p className="text-red-900 font-semibold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex text-sm font-bold text-amber-900 mb-3 items-center">
                <User className="h-4 w-4 mr-2 text-amber-600" />
                {isRTL ? "الاسم الكامل" : "Full Name"}
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 bg-amber-50"
                required
                disabled={loading}
                placeholder={
                  isRTL ? "أدخل اسمك الكامل" : "Enter your full name"
                }
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="flex text-sm font-bold text-amber-900 mb-3 items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-600" />
                {isRTL ? "رقم الهاتف" : "Phone Number"}
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 bg-amber-50"
                required
                disabled={loading}
                placeholder={
                  isRTL ? "أدخل رقم هاتفك" : "Enter your phone number"
                }
              />
            </div>

            {/* Date Field */}
            <div>
              <label className="flex text-sm font-bold text-amber-900 mb-3 items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                {isRTL ? "التاريخ" : "Date"}
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 text-gray-900 bg-amber-50"
                required
                disabled={loading}
                min={getTodayDate()}
              />
            </div>

            {/* Time Field */}
            <div>
              <label className="flex text-sm font-bold text-amber-900 mb-3 items-center">
                <Clock className="h-4 w-4 mr-2 text-amber-600" />
                {isRTL ? "الوقت" : "Time"}
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="w-full border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 rounded-lg px-4 py-3 text-gray-900 bg-amber-50"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    className={`h-5 w-5 animate-spin ${
                      isRTL ? "ml-2" : "mr-2"
                    }`}
                  />
                  {isRTL ? "جاري الحجز..." : "Booking..."}
                </>
              ) : (
                <>
                  <Calendar className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {isRTL ? "احجز الميتنج" : "Book Meeting"}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingForm;
