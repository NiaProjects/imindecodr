"use client";

import React, { useState } from "react";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactApi, ContactFormData } from "@/lib/api";

const Contact = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    unitType: "",
    unitLocation: "",
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

      // Map form data to API structure
      const apiData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        msg: formData.message,
        location: formData.unitLocation,
        type_unit: formData.unitType,
      };

      await contactApi.submit(apiData);

      // Success
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        unitType: "",
        unitLocation: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");

      // Reset error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-pattern-slanted-lines-reverse"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 fade-in-up">
            {t("contact.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            className="card-elegant p-8 fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800 font-medium">
                  {t("contact.success") ||
                    "Message sent successfully! We'll get back to you soon."}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.name")}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.phone")}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.email")}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.unitType")}
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("unitType", value)
                    }
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("contact.unitType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">
                        {t("contact.apartment")}
                      </SelectItem>
                      <SelectItem value="villa">
                        {t("contact.villa")}
                      </SelectItem>
                      <SelectItem value="office">
                        {t("contact.office")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.unitLocation")}
                  </label>
                  <Input
                    type="text"
                    value={formData.unitLocation}
                    onChange={(e) =>
                      handleInputChange("unitLocation", e.target.value)
                    }
                    className="w-full"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.message")}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full h-32 resize-none"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2
                      className={`h-5 w-5 animate-spin ${
                        isRTL ? "ml-2" : "mr-2"
                      }`}
                    />
                    {t("contact.sending") || "Sending..."}
                  </>
                ) : (
                  <>
                    <Send className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t("contact.send")}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className="space-y-8 fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            {/* Contact Details */}
            <div className="card-elegant p-8">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">
                    01208777757
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">
                    kmali@imicegypt.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">
                    East hub floor 2
مدخل 1
فوق كاريبو 
مدينتي القاهرة الجديده
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card-elegant p-8">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
                Our Location
              </h3>
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3452.71077424365!2d31.673624984884142!3d30.07382388187163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA0JzI1LjgiTiAzMcKwNDAnMTcuMiJF!5e0!3m2!1sar!2seg!4v1753886655635!5m2!1sar!2seg" className="w-full h-full rounded-lg"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
