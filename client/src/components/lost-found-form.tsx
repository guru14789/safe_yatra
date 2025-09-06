import React, { useState } from 'react';
import { X, User, MapPin, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface LostFoundFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function LostFoundForm({ isOpen, onClose, onSubmit }: LostFoundFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    description: '',
    lastSeenLocation: {
      address: '',
      lat: 0,
      lng: 0
    },
    reporterName: '',
    reporterPhone: '',
    relation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('lastSeenLocation.')) {
      const locationField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        lastSeenLocation: {
          ...prev.lastSeenLocation,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.reporterName || !formData.reporterPhone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get current location if available
      if (navigator.geolocation && !formData.lastSeenLocation.lat) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const updatedData = {
              ...formData,
              lastSeenLocation: {
                ...formData.lastSeenLocation,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            };
            await submitForm(updatedData);
          },
          async () => {
            // If location fails, submit without coordinates
            await submitForm(formData);
          }
        );
      } else {
        await submitForm(formData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const submitForm = async (data: any) => {
    try {
      const response = await apiRequest('POST', '/api/pilgrim/lost-found', {
        name: data.name,
        age: data.age ? parseInt(data.age) : undefined,
        gender: data.gender || undefined,
        description: data.description,
        lastSeenLocation: data.lastSeenLocation,
        reportedBy: {
          name: data.reporterName,
          phone: data.reporterPhone,
          relation: data.relation
        }
      });

      const result = await response.json();
      
      toast({
        title: "Report Submitted",
        description: "Your lost person report has been submitted to authorities",
      });

      onSubmit(result);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        age: '',
        gender: '',
        description: '',
        lastSeenLocation: { address: '', lat: 0, lng: 0 },
        reporterName: '',
        reporterPhone: '',
        relation: ''
      });
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Report Missing Person</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Missing Person Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                <span>Missing Person Details</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Age"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Physical description, clothing, distinguishing features..."
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Last Seen Location */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4" />
                <span>Last Seen Location</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastSeenAddress">Location/Address</Label>
                <Input
                  id="lastSeenAddress"
                  value={formData.lastSeenLocation.address}
                  onChange={(e) => handleInputChange('lastSeenLocation.address', e.target.value)}
                  placeholder="e.g., Main Ghat, Temple Complex, Food Court"
                />
              </div>
            </div>

            {/* Reporter Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4" />
                <span>Your Contact Details</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reporterName">Your Name *</Label>
                <Input
                  id="reporterName"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reporterPhone">Your Phone Number *</Label>
                <Input
                  id="reporterPhone"
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relation">Relation to Missing Person</Label>
                <Input
                  id="relation"
                  value={formData.relation}
                  onChange={(e) => handleInputChange('relation', e.target.value)}
                  placeholder="e.g., Father, Mother, Friend, Guide"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-500 hover:bg-red-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}