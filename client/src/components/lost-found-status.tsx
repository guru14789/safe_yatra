import React, { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';

interface LostFoundReport {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  description: string;
  status: 'missing' | 'found' | 'closed';
  lastSeenLocation: {
    address?: string;
    lat: number;
    lng: number;
  };
  reportedBy: {
    name: string;
    phone: string;
    relation: string;
  };
  timestamp: string;
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
}

interface LostFoundStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LostFoundStatus({ isOpen, onClose }: LostFoundStatusProps) {
  const [reports, setReports] = useState<LostFoundReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchReports();
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchReports, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const fetchReports = async () => {
    try {
      const response = await apiRequest('GET', `/api/pilgrim/lost-found?userId=${user?.id}`);
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing': return 'bg-red-100 text-red-800';
      case 'found': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missing': return <AlertCircle className="h-4 w-4" />;
      case 'found': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <Clock className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Your Lost & Found Reports</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            ×
          </Button>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reports submitted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{report.name}</h3>
                        {report.age && (
                          <p className="text-sm text-gray-600">
                            Age: {report.age} {report.gender && `• ${report.gender}`}
                          </p>
                        )}
                      </div>
                      <Badge className={`${getStatusColor(report.status)} flex items-center space-x-1`}>
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status}</span>
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p><strong>Description:</strong> {report.description}</p>
                      
                      {report.lastSeenLocation.address && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <span>{report.lastSeenLocation.address}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>Contact: {report.reportedBy.name} ({report.reportedBy.phone})</span>
                      </div>

                      <p className="text-gray-500">
                        Reported: {formatTimestamp(report.timestamp)}
                      </p>

                      {/* Response from Command Center */}
                      {report.response && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Response from Command Center</span>
                          </div>
                          <p className="text-sm text-blue-800 mb-2">{report.response}</p>
                          {report.respondedBy && (
                            <p className="text-xs text-blue-600">
                              By: {report.respondedBy} • {report.respondedAt && formatTimestamp(report.respondedAt)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}