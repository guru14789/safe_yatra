import React, { useState, useEffect } from 'react';
import { Shield, LogOut, AlertTriangle, MapPin, Search, Route, Users, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { navigate } from 'wouter/use-browser-location';

export default function SafeYatraDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [crowdLevel, setCrowdLevel] = useState('Low');
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    accuracy: null,
    lastUpdated: null
  });
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [heatmapData, setHeatmapData] = useState([]);
  const [lastHeatmapUpdate, setLastHeatmapUpdate] = useState(new Date());

  // Get user's current location
  useEffect(() => {
    let watchId;

    const getLocation = () => {
      if ('geolocation' in navigator) {
        const options = {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0 // Don't use cached location
        };

        // First try to get current position immediately
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: Math.round(position.coords.accuracy),
              lastUpdated: new Date()
            });
            setLocationError(null);
            setIsLoadingLocation(false);
            console.log('Location found:', position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Initial geolocation error:', error);
            setLocationError(error.message);
            setIsLoadingLocation(false);
          },
          options
        );

        // Then set up continuous watching
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: Math.round(position.coords.accuracy),
              lastUpdated: new Date()
            });
            setLocationError(null);
            setIsLoadingLocation(false);
            console.log('Location updated:', position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error('Watch geolocation error:', error);
            setLocationError(error.message);
            setIsLoadingLocation(false);
          },
          options
        );
      } else {
        setLocationError('Geolocation not supported by this browser');
        setIsLoadingLocation(false);
      }
    };

    getLocation();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Generate realistic heatmap data around user's location
  useEffect(() => {
    if (location.lat && location.lng) {
      const generateHeatmapData = () => {
        const points = [];
        const baseRadius = 0.01; // ~1km radius
        
        // Generate 15-25 crowd points around user location
        const numPoints = 15 + Math.floor(Math.random() * 10);
        
        for (let i = 0; i < numPoints; i++) {
          // Random position within radius
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.random() * baseRadius;
          
          const lat = location.lat + (distance * Math.cos(angle));
          const lng = location.lng + (distance * Math.sin(angle));
          
          // Generate crowd level based on proximity to certain "hotspots"
          let intensity;
          const distanceFromCenter = Math.sqrt(Math.pow(lat - location.lat, 2) + Math.pow(lng - location.lng, 2));
          
          // Create hotspots - some areas are naturally more crowded
          if (distanceFromCenter < baseRadius * 0.3) {
            intensity = Math.random() < 0.6 ? 'high' : 'medium'; // Center areas tend to be crowded
          } else if (distanceFromCenter < baseRadius * 0.7) {
            intensity = Math.random() < 0.5 ? 'medium' : 'low'; // Mid areas are mixed
          } else {
            intensity = Math.random() < 0.7 ? 'low' : 'medium'; // Outer areas mostly low
          }
          
          points.push({
            id: `point_${i}`,
            lat,
            lng,
            intensity,
            population: intensity === 'high' ? 150 + Math.floor(Math.random() * 300) : 
                       intensity === 'medium' ? 50 + Math.floor(Math.random() * 100) : 
                       10 + Math.floor(Math.random() * 40),
            lastUpdated: new Date()
          });
        }
        
        setHeatmapData(points);
        setLastHeatmapUpdate(new Date());
      };

      // Generate initial data
      generateHeatmapData();
      
      // Update heatmap every 30 seconds with slight variations
      const heatmapInterval = setInterval(() => {
        setHeatmapData(prevData => 
          prevData.map(point => {
            // Randomly update some points
            if (Math.random() < 0.3) { // 30% chance to update each point
              const newPopulation = point.intensity === 'high' ? 150 + Math.floor(Math.random() * 300) : 
                                  point.intensity === 'medium' ? 50 + Math.floor(Math.random() * 100) : 
                                  10 + Math.floor(Math.random() * 40);
              
              // Occasionally change intensity based on population
              let newIntensity = point.intensity;
              if (newPopulation > 200) newIntensity = 'high';
              else if (newPopulation > 75) newIntensity = 'medium';
              else newIntensity = 'low';
              
              return {
                ...point,
                intensity: newIntensity,
                population: newPopulation,
                lastUpdated: new Date()
              };
            }
            return point;
          })
        );
        setLastHeatmapUpdate(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(heatmapInterval);
    }
  }, [location.lat, location.lng]);

  const formatCoordinate = (coord) => {
    return coord ? coord.toFixed(6) : '0.000000';
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Never';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low': return '#22c55e'; // green
      case 'medium': return '#f59e0b'; // yellow/orange
      case 'high': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getIntensitySize = (intensity) => {
    switch (intensity) {
      case 'low': return 8;
      case 'medium': return 12;
      case 'high': return 16;
      default: return 8;
    }
  };

  const getCurrentCrowdLevel = () => {
    if (!heatmapData.length || !location.lat) return 'Low';
    
    const nearbyPoints = heatmapData.filter(point => {
      const distance = Math.sqrt(
        Math.pow(point.lat - location.lat, 2) + Math.pow(point.lng - location.lng, 2)
      );
      return distance < 0.003; // Within ~300m
    });
    
    const highIntensity = nearbyPoints.filter(p => p.intensity === 'high').length;
    const mediumIntensity = nearbyPoints.filter(p => p.intensity === 'medium').length;
    
    if (highIntensity > 2) return 'High';
    if (highIntensity > 0 || mediumIntensity > 3) return 'Medium';
    return 'Low';
  };

  const dynamicCrowdLevel = getCurrentCrowdLevel();

  const handleSOS = () => {
    // Include current location in SOS alert
    const locationInfo = (locationError || !location.lat) 
      ? 'Location unavailable - Please enable GPS' 
      : `Lat: ${formatCoordinate(location.lat)}, Lng: ${formatCoordinate(location.lng)}`;
    alert(`🚨 EMERGENCY SOS ACTIVATED! 🚨\nHelp is on the way.\n\nLocation: ${locationInfo}\nAccuracy: ${location.accuracy ? `±${location.accuracy}m` : 'Unknown'}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getSecondsUntilUpdate = () => {
    if (!lastHeatmapUpdate) return 30;
    const elapsed = Math.floor((new Date() - lastHeatmapUpdate) / 1000);
    return Math.max(0, 30 - elapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">SafeYatra</h1>
            <p className="text-sm text-gray-500">Simhastha 2028</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="text-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-6 space-y-6">
        
        {/* Emergency SOS Button */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <Button
              onClick={handleSOS}
              className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg mb-3 flex items-center justify-center"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              EMERGENCY SOS
            </Button>
            <p className="text-sm text-red-700">Press for immediate emergency assistance</p>
          </CardContent>
        </Card>

        {/* Current Location Status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Current Location Status</h3>
              </div>
              {isLoadingLocation && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">Locating...</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Crowd Level:</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    dynamicCrowdLevel === 'High' ? 'bg-red-100 text-red-800' :
                    dynamicCrowdLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {dynamicCrowdLevel}
                  </span>
                </div>
              </div>
              
              {locationError ? (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="font-medium">Location Error</span>
                  </div>
                  <p className="text-sm">{locationError}</p>
                  <p className="text-xs mt-1 text-red-500">
                    Please enable location services and refresh the page
                  </p>
                </div>
              ) : !location.lat ? (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Getting your precise location...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Latitude:</span>
                      <span className="font-mono text-gray-900">{formatCoordinate(location.lat)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Longitude:</span>
                      <span className="font-mono text-gray-900">{formatCoordinate(location.lng)}</span>
                    </div>
                    {location.accuracy && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="text-sm text-gray-500">±{location.accuracy}m</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="text-sm text-gray-500">{getTimeAgo(location.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Lost & Found</h4>
              <p className="text-sm text-gray-500">Report missing person</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-8 text-center">
              <Route className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Safe Route</h4>
              <p className="text-sm text-gray-500">Navigate safely</p>
            </CardContent>
          </Card>
        </div>

        {/* Crowd Heatmap */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Live Crowd Heatmap</h3>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">
                  Updated {getTimeAgo(lastHeatmapUpdate)}
                </span>
              </div>
            </div>
            
            {/* Interactive Heatmap */}
            <div className="bg-gray-100 rounded-lg h-80 mb-4 relative overflow-hidden">
              {locationError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">Location Access Required</p>
                    <p className="text-sm">Please enable GPS for heatmap</p>
                  </div>
                </div>
              ) : !location.lat ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="font-medium">Loading Heatmap...</p>
                    <p className="text-sm">Analyzing crowd density</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50">
                  {/* Base Map Background */}
                  <div className="absolute inset-0 opacity-30">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.01}%2C${location.lat-0.01}%2C${location.lng+0.01}%2C${location.lat+0.01}&layer=mapnik`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      className="rounded-lg"
                      title="Heatmap Base"
                    />
                  </div>
                  
                  {/* Heatmap Overlay */}
                  <div className="absolute inset-0 rounded-lg">
                    <svg width="100%" height="100%" className="rounded-lg">
                      {/* User location */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="6"
                        fill="#2563eb"
                        stroke="white"
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                      <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        className="text-xs font-bold fill-white"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                      >
                        YOU
                      </text>
                      
                      {/* Crowd density points */}
                      {heatmapData.map((point, index) => {
                        // Convert lat/lng to SVG coordinates
                        const xPercent = 50 + ((point.lng - location.lng) / 0.02) * 100;
                        const yPercent = 50 - ((point.lat - location.lat) / 0.02) * 100;
                        
                        // Only show points within visible area
                        if (xPercent >= 0 && xPercent <= 100 && yPercent >= 0 && yPercent <= 100) {
                          return (
                            <g key={point.id}>
                              {/* Glow effect for high intensity */}
                              {point.intensity === 'high' && (
                                <circle
                                  cx={`${xPercent}%`}
                                  cy={`${yPercent}%`}
                                  r={getIntensitySize(point.intensity) + 8}
                                  fill={getIntensityColor(point.intensity)}
                                  opacity="0.2"
                                  className="animate-pulse"
                                />
                              )}
                              
                              {/* Main crowd circle */}
                              <circle
                                cx={`${xPercent}%`}
                                cy={`${yPercent}%`}
                                r={getIntensitySize(point.intensity)}
                                fill={getIntensityColor(point.intensity)}
                                opacity="0.7"
                                stroke="white"
                                strokeWidth="1"
                              />
                              
                              {/* Population count for medium and high */}
                              {(point.intensity === 'medium' || point.intensity === 'high') && (
                                <text
                                  x={`${xPercent}%`}
                                  y={`${yPercent + 1}%`}
                                  textAnchor="middle"
                                  className="text-xs font-bold fill-white"
                                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                                >
                                  {point.population}
                                </text>
                              )}
                            </g>
                          );
                        }
                        return null;
                      })}
                    </svg>
                  </div>
                  
                  {/* Live indicator */}
                  <div className="absolute top-3 left-3 bg-white rounded-lg px-3 py-1 shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">Live Crowd Data</span>
                    </div>
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-2 shadow-md">
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">
                        {heatmapData.filter(p => p.intensity === 'high').length} High Density
                      </div>
                      <div className="text-gray-600">
                        {heatmapData.filter(p => p.intensity === 'medium').length} Medium • {heatmapData.filter(p => p.intensity === 'low').length} Low
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Enhanced Legend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Low (10-50)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Medium (50-150)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>High (150+)</span>
                  </div>
                </div>
              </div>
              
              {/* Real-time stats */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-blue-900">Total People in Area:</span>
                    <span className="ml-2 text-blue-700">
                      {heatmapData.reduce((sum, point) => sum + point.population, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-blue-600 text-xs">
                    Next update: {getSecondsUntilUpdate()}s
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Reminder */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Safety Reminder</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Stay hydrated and avoid overcrowded areas</li>
              <li>• Keep emergency contacts ready</li>
              <li>• Follow official announcements</li>
            </ul>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}