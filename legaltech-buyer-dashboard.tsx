import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, AlertCircle, Monitor, Building2, Users, TrendingUp, DollarSign, Shield, Zap, FileText, Calendar, Mail, Phone, Linkedin, ExternalLink, ChevronRight, XCircle, RefreshCw, Target, CreditCard } from 'lucide-react';

const LegalTechBuyerDashboard = () => {
  const [activeStage, setActiveStage] = useState(3);
  
  const stages = [
    { id: 1, name: 'RFP Received', date: 'Aug 1, 2025', status: 'completed', duration: 'Day 0' },
    { id: 2, name: 'Bid/No-Bid Decision', date: 'Aug 3, 2025', status: 'completed', duration: '1-2 days' },
    { id: 3, name: 'Technical Review & Strategy', date: 'Aug 8, 2025', status: 'current', duration: '5-7 days' },
    { id: 4, name: 'Demo Preparation', date: 'Due: Aug 15', status: 'upcoming', duration: '7 days' },
    { id: 5, name: 'Security & Compliance Documentation', date: 'Due: Aug 18', status: 'upcoming', duration: '3-5 days' },
    { id: 6, name: 'Pricing & Proposal Drafting', date: 'Due: Aug 22', status: 'upcoming', duration: '4-5 days' },
    { id: 7, name: 'Internal Review', date: 'Due: Aug 26', status: 'upcoming', duration: '3-4 days' },
    { id: 8, name: 'Final Production & Submission', date: 'Due: Sep 1, 2025', status: 'upcoming', duration: '3-5 days' }
  ];

  const daysUntilDeadline = 24;
  const completionPercentage = 30;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Circle className="w-5 h-5 text-blue-600 fill-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">Acme Corporation</h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Active RFP</span>
              </div>
              <p className="text-gray-600">Fortune 500 Technology Company | Legal Spend Management System RFP</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                View RFP
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-8">
          {/* RFP Overview Alert */}
          <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-indigo-900 mb-2">RFP Snapshot</h3>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-indigo-600 font-medium">Replacing</p>
                    <p className="text-indigo-900">Counsel Link</p>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-medium">Decision Timeline</p>
                    <p className="text-indigo-900">90 Days</p>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-medium">Max Responses</p>
                    <p className="text-indigo-900">4 vendors</p>
                  </div>
                  <div>
                    <p className="text-indigo-600 font-medium">User Seats</p>
                    <p className="text-indigo-900">36 licenses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">36</p>
              <p className="text-sm text-gray-600">Required Licenses</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">90</p>
              <p className="text-sm text-gray-600">Days to Decision</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Max Competing Vendors</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">Annual</p>
              <p className="text-sm text-gray-600">Billing Frequency</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="col-span-2 space-y-6">
              {/* Product Being Replaced */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Solution & Replacement Context</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900 mb-1">Replacing: Counsel Link</p>
                      <p className="text-sm text-red-700 mb-2">Reason: Feature / Functionality, Support</p>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Status: Looking around but may renew</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm font-semibold text-amber-900 mb-2">⚠️ Competitive Risk</p>
                    <p className="text-sm text-amber-800">Buyer is not fully committed to replacement. Counsel Link may counter-offer with feature improvements or pricing incentives. Must demonstrate clear differentiation and ROI to win.</p>
                  </div>
                </div>
              </div>

              {/* Core Requirements */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Software Requirements (Must-Have)</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Matter Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Vendor Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Invoice Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Payment Processing</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Reporting & Analytics</span>
                  </div>
                </div>
              </div>

              {/* Demo Requirements */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Demonstration Requirements</h2>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Monitor className="w-6 h-6 text-blue-600 mb-3" />
                  <p className="text-sm text-gray-900 leading-relaxed">
                    "Robust matter management with calendaring, straightforward ebilling with law firms, reporting and analytics"
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs font-semibold text-blue-900 mb-2">Demo Strategy Recommendations:</p>
                    <ul className="space-y-1 text-xs text-blue-800">
                      <li>• Emphasize ease-of-use in ebilling workflows (addressing support issues with Counsel Link)</li>
                      <li>• Showcase calendar integration and matter tracking features</li>
                      <li>• Demonstrate advanced reporting capabilities with real-time analytics</li>
                      <li>• Highlight superior UI/UX compared to legacy Counsel Link interface</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contract & Payment Terms */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract & Payment Terms</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Contract Term</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">Multi-year</p>
                      <p className="text-xs text-gray-500 mt-1">Likely 2-3 year commitment</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Billing Interval</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">Annual</p>
                      <p className="text-xs text-gray-500 mt-1">Upfront yearly payment</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Payment Terms</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">Net 45</p>
                      <p className="text-xs text-gray-500 mt-1">45 days from invoice</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">User Licenses</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">36 seats</p>
                      <p className="text-xs text-gray-500 mt-1">Fixed license count</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Overview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Industry</p>
                    <p className="text-sm text-gray-900">Enterprise Software & Cloud Services</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Headquarters</p>
                    <p className="text-sm text-gray-900">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Company Size</p>
                    <p className="text-sm text-gray-900">12,000+ employees</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
                    <p className="text-sm text-gray-900">$2.3B (2024)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Public/Private</p>
                    <p className="text-sm text-gray-900">Publicly Traded (NASDAQ: ACME)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Geographic Presence</p>
                    <p className="text-sm text-gray-900">North America, EMEA, APAC</p>
                  </div>
                </div>
              </div>

              {/* Legal Department Profile */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal Department Profile</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Department Structure</p>
                      <p className="text-sm text-gray-600 mt-1">36 active system users across legal operations, procurement, and finance teams managing outside counsel spend.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Outside Counsel Spend Management</p>
                      <p className="text-sm text-gray-600 mt-1">Managing significant external legal spend across multiple law firms. Need improved visibility, budget control, and streamlined ebilling processes.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Pain Points with Current System</p>
                      <p className="text-sm text-gray-600 mt-1">Counsel Link lacks modern features and responsive support. Team struggles with reporting, ebilling complexity, and outdated interface affecting user adoption.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Tech Stack */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Tech Stack</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Counsel Link</p>
                        <p className="text-xs text-gray-500">Legal Spend Management - Legacy (2019)</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Replacing</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">NetSuite ERP</p>
                        <p className="text-xs text-gray-500">Finance & Accounting</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Microsoft 365</p>
                        <p className="text-xs text-gray-500">Productivity Suite</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Integration Requirements</p>
                    <p className="text-xs text-blue-800">Must integrate seamlessly with NetSuite for payment processing and Microsoft 365 for calendar/email.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Decision Timeline */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Decision Timeline</h2>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-3xl font-bold text-indigo-600">90</p>
                    <p className="text-sm text-gray-600 mt-1">Days to Final Decision</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">RFP Issued</p>
                        <p className="text-xs text-gray-500">Aug 1, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">Demos</p>
                        <p className="text-xs text-gray-500">Aug 15-25 (Est.)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">Final Decision</p>
                        <p className="text-xs text-gray-500">Oct 30, 2025 (Est.)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Stakeholders */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Stakeholders</h2>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Jennifer Martinez</p>
                        <p className="text-xs text-gray-500">General Counsel</p>
                      </div>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">Decision Maker</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <a href="#" className="text-xs text-indigo-600 hover:underline">jmartinez@acme.com</a>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Linkedin className="w-3 h-3 text-gray-400" />
                      <a href="#" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                        LinkedIn Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">David Chen</p>
                        <p className="text-xs text-gray-500">Director, Legal Operations</p>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Primary Contact</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <a href="#" className="text-xs text-indigo-600 hover:underline">dchen@acme.com</a>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">(415) 555-0142</span>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Lisa Patel</p>
                        <p className="text-xs text-gray-500">VP, Finance</p>
                      </div>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Influencer</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <a href="#" className="text-xs text-indigo-600 hover:underline">lpatel@acme.com</a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Michael Rodriguez</p>
                        <p className="text-xs text-gray-500">Chief Information Security Officer</p>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">Gatekeeper</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <a href="#" className="text-xs text-indigo-600 hover:underline">mrodriguez@acme.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Intelligence */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitive Intelligence</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm font-medium text-amber-900 mb-1">Incumbent Risk</p>
                    <div className="space-y-1">
                      <p className="text-xs text-amber-700">• <strong>Counsel Link</strong> is the incumbent (2019-present)</p>
                      <p className="text-xs text-amber-700">• Status: "May renew" - not locked into replacement</p>
                      <p className="text-xs text-amber-700">• Likely exploring if features/support improve</p>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-900 mb-1">Expected Competitors</p>
                    <div className="space-y-1">
                      <p className="text-xs text-red-700">• Counsel Link (renewal option)</p>
                      <p className="text-xs text-red-700">• SimpleLegal</p>
                      <p className="text-xs text-red-700">• Legal Tracker</p>
                      <p className="text-xs text-red-700 font-semibold">Max 4 responses allowed</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-1">Our Advantages</p>
                    <div className="space-y-1">
                      <p className="text-xs text-green-700">• Modern UI vs legacy Counsel Link</p>
                      <p className="text-xs text-green-700">• Superior reporting & analytics</p>
                      <p className="text-xs text-green-700">• Simplified ebilling workflows</p>
                      <p className="text-xs text-green-700">• Responsive support team</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Intelligence */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Intelligence</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Estimated Annual Value</p>
                    <p className="text-xl font-bold text-gray-900">$85K - $130K</p>
                    <p className="text-xs text-gray-500 mt-1">36 seats × $2,400-$3,600/seat</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-600 mb-1">Contract Value</p>
                    <p className="text-sm text-gray-900">Multi-year: $170K - $390K</p>
                    <p className="text-xs text-gray-500 mt-1">2-3 year term likely</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-600 mb-1">Payment Terms</p>
                    <p className="text-sm text-gray-900">Annual billing, Net 45</p>
                  </div>
                </div>
              </div>

              {/* Relationship History */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Relationship History</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Previous Demo</p>
                      <p className="text-xs text-gray-600">March 2024 - Legal spend product demo</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Conference Meeting</p>
                      <p className="text-xs text-gray-600">Oct 2024 - CLOC Conference, spoke with David Chen</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Webinar Attendee</p>
                      <p className="text-xs text-gray-600">Jan 2025 - Outside Counsel Management webinar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - RFP Status */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">RFP Status</h2>
          </div>
          <p className="text-sm text-gray-500">Track your proposal progress</p>
        </div>

        {/* Deadline Alert */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                {daysUntilDeadline} days until submission
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Due: September 1, 2025 at 5:00 PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stage Timeline */}
        <div className="flex-1 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Timeline</h3>
          <div className="space-y-1">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                {index < stages.length - 1 && (
                  <div 
                    className={`absolute left-[10px] top-8 w-0.5 h-10 ${
                      stage.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
                
                <div 
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    stage.status === 'current' ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveStage(stage.id)}
                >
                  <div className="mt-0.5">
                    {getStatusIcon(stage.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      stage.status === 'completed' ? 'text-gray-900' :
                      stage.status === 'current' ? 'text-blue-900' :
                      'text-gray-500'
                    }`}>
                      {stage.name}
                    </p>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-gray-500">{stage.date}</p>
                      <p className="text-xs text-gray-400">{stage.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Deliverables */}
        <div className="mb-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Key Deliverables</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700">Product demo environment</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500"></div>
              <span className="text-gray-700">Matter mgmt + ebilling demo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
              <span className="text-gray-500">Reporting & analytics showcase</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
              <span className="text-gray-500">NetSuite integration specs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
              <span className="text-gray-500">36-seat pricing proposal</span>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mb-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Action Items</h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
              4 pending
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Build demo: ebilling + matter mgmt</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Prepare Counsel Link comparison</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Price 36-seat annual package</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Document NetSuite integration</span>
            </div>
          </div>
        </div>

        {/* Demo Scheduled */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="w-4 h-4 text-purple-700" />
            <span className="text-sm font-semibold text-purple-900">Demo Scheduled</span>
          </div>
          <p className="text-xs text-purple-700">Aug 15, 2025 at 2:00 PM EST</p>
          <p className="text-xs text-purple-600 mt-1">With: Legal Ops Director + Finance VP + 2 others</p>
        </div>
      </div>
    </div>
  );
};

export default LegalTechBuyerDashboard;