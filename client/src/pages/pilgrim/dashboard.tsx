@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { Shield, LogOut, AlertTriangle, MapPin, Search, Route, Users, Navigation } from 'lucide-react';
+import { Shield, LogOut, AlertTriangle, MapPin, Search, Route, Users, Navigation, Eye } from 'lucide-react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { navigate } from 'wouter/use-browser-location';
+import { LostFoundForm } from '@/components/lost-found-form';
+import { LostFoundStatus } from '@/components/lost-found-status';

 export default function SafeYatraDashboard() {
@@ .. @@
   const [lastHeatmapUpdate, setLastHeatmapUpdate] = useState(new Date());
+  const [showLostFoundForm, setShowLostFoundForm] = useState(false);
+  const [showLostFoundStatus, setShowLostFoundStatus] = useState(false);

   // Get user's current location
@@ .. @@
     navigate('/');
   };

+  const handleLostFoundSubmit = (data: any) => {
+    console.log('Lost & Found report submitted:', data);
+    // The form component handles the API call and shows success message
+  };
+
   const getSecondsUntilUpdate = () => {
@@ .. @@
         {/* Quick Actions */}
         <div className="grid grid-cols-2 gap-4">
-          <Card className="hover:shadow-md transition-shadow cursor-pointer">
+          <Card 
+            className="hover:shadow-md transition-shadow cursor-pointer"
+            onClick={() => setShowLostFoundForm(true)}
+          >
             <CardContent className="p-8 text-center">
               <Search className="w-12 h-12 text-blue-500 mx-auto mb-4" />
               <h4 className="font-semibold text-gray-900 mb-2">Lost & Found</h4>
               <p className="text-sm text-gray-500">Report missing person</p>
             </CardContent>
           </Card>
           
           <Card className="hover:shadow-md transition-shadow cursor-pointer">
@@ .. @@
           </Card>
         </div>

+        {/* Lost & Found Status Button */}
+        <Card className="bg-blue-50 border-blue-200">
+          <CardContent className="p-4">
+            <div className="flex items-center justify-between">
+              <div>
+                <h4 className="font-medium text-blue-900 mb-1">Lost & Found Reports</h4>
+                <p className="text-sm text-blue-700">Check status of your submitted reports</p>
+              </div>
+              <Button
+                onClick={() => setShowLostFoundStatus(true)}
+                variant="outline"
+                size="sm"
+                className="border-blue-300 text-blue-700 hover:bg-blue-100"
+              >
+                <Eye className="w-4 h-4 mr-2" />
+                View Status
+              </Button>
+            </div>
+          </CardContent>
+        </Card>
+
         {/* Crowd Heatmap */}
@@ .. @@
         </Card>

       </main>
+
+      {/* Lost & Found Form Modal */}
+      <LostFoundForm
+        isOpen={showLostFoundForm}
+        onClose={() => setShowLostFoundForm(false)}
+        onSubmit={handleLostFoundSubmit}
+      />
+
+      {/* Lost & Found Status Modal */}
+      <LostFoundStatus
+        isOpen={showLostFoundStatus}
+        onClose={() => setShowLostFoundStatus(false)}
+      />
     </div>
   );
 }