"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleInput, SimpleTextarea, ImageUploadInput } from './SharedUI';
import { Save, Loader2, CheckCircle2, AlertCircle, Palette, PenTool, Clapperboard, Monitor, RefreshCw, Eye, Type, Image as ImageIcon, CreditCard } from 'lucide-react';

// Default data structures for each tab
const defaultTabData: Record<string, any> = {
  branding: {
    badgeText: 'Trust, Innovation, Prosperity',
    headline: 'Effortless banking,\ntotal financial ease',
    description: 'Your financial needs evolve — and your bank should too. From managing daily expenses to planning for life\'s biggest moments, our platform adapts to support your goals at every stage.',
    buttonText: 'Open an Account',
    buttonUrl: '/contact',
    statLabel: 'New clients',
    statValue: '135K+',
    card1Image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    card1Label: 'Mobile banking\nat your fingertips',
    card2Badge: 'Haven',
    card2Subtitle: 'Credit Card',
    card2Value: '5769',
    card2Name: 'Alan\nWinklevoss',
    card2Role: 'VISA',
    profileName: 'Jerry Wick',
    profileDesc: '$329,394.23',
    profileAvatar: 'https://i.pravatar.cc/150?u=jerry',
    card3Image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    card3Label: 'Advising our\ncustomers 24/7',
    card4Image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80',
    card4Label: 'Custom cards',
    accentColor: '#00A3FF',
    badgeBgColor: '#E0F7FF',
  },
  illustration: {
    badgeText: 'Craft, Story, Perspective',
    headline: 'Effortless art,\ntotal creative ease',
    description: 'Your visual needs evolve — and your storytelling should too. From managing initial sketches to delivering final masterpieces, we adapt to support your vision at every stage.',
    buttonText: 'Explore Gallery',
    buttonUrl: '/gallery',
    statLabel: 'Artworks',
    statValue: '8K+',
    card1Image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    card1Label: 'Digital illustration\nat your fingertips',
    card2Badge: 'Artist',
    card2Subtitle: 'Portfolio Card',
    card2Value: '8812',
    card2Name: 'Jessica\nMoore',
    card2Role: 'PRO',
    profileName: 'Jessica Moore',
    profileDesc: 'Character Specialist',
    profileAvatar: 'https://i.pravatar.cc/150?u=jessica',
    card3Image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&q=80',
    card3Label: 'Delivering creative\nimpact 24/7',
    card4Image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    card4Label: 'Custom artwork',
    accentColor: '#00D1FF',
    badgeBgColor: '#F0FBFF',
  },
  motion: {
    badgeText: 'Timing, Spacing, Impact',
    headline: 'Effortless motion,\ntotal dynamic ease',
    description: 'Your content needs evolve — and your motion should too. From managing initial timing curves to delivering final cinematic sequences, we adapt to support your dynamic goals.',
    buttonText: 'Watch Showreel',
    buttonUrl: '/showreel',
    statLabel: 'Frames Reel',
    statValue: '5K+',
    card1Image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    card1Label: 'Dynamic sequences\nat your fingertips',
    card2Badge: 'Animator',
    card2Subtitle: 'Motion Pass Card',
    card2Value: '2017',
    card2Name: 'Marcus\nKane',
    card2Role: '60FPS',
    profileName: 'Marcus Kane',
    profileDesc: 'VFX Lead',
    profileAvatar: 'https://i.pravatar.cc/150?u=marcus',
    card3Image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    card3Label: 'High performance\nsystems 24/7',
    card4Image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    card4Label: 'Custom motion',
    accentColor: '#6366F1',
    badgeBgColor: '#EEF2FF',
  },
  uiux: {
    badgeText: 'Empathy, Accessibility, Speed',
    headline: 'Effortless products,\ntotal user ease',
    description: 'Your product needs evolve — and your interface should too. From managing user research to delivering high-fidelity prototypes, we adapt to support your user-centric goals.',
    buttonText: 'View Prototypes',
    buttonUrl: '/prototypes',
    statLabel: 'Users Impacted',
    statValue: '20K+',
    card1Image: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=800&q=80',
    card1Label: 'User interfaces\nat your fingertips',
    card2Badge: 'Designer',
    card2Subtitle: 'UIPass Card',
    card2Value: '2016',
    card2Name: 'Sarah\nJenkins',
    card2Role: 'UX',
    profileName: 'Sarah Jenkins',
    profileDesc: 'Design Systems Lead',
    profileAvatar: 'https://i.pravatar.cc/150?u=sarah',
    card3Image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    card3Label: 'Optimizing user\nflow 24/7',
    card4Image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    card4Label: 'Custom prototypes',
    accentColor: '#10B981',
    badgeBgColor: '#ECFDF5',
  },
};

const tabsList = [
  { id: 'branding', label: 'Branding', icon: Palette, color: '#00A3FF' },
  { id: 'illustration', label: 'Illustration', icon: PenTool, color: '#00D1FF' },
  { id: 'motion', label: 'Motion Graphics', icon: Clapperboard, color: '#6366F1' },
  { id: 'uiux', label: 'UI/UX', icon: Monitor, color: '#10B981' },
];

export function BreandingManagement() {
  const [activeTab, setActiveTab] = useState('branding');
  const [formData, setFormData] = useState<any>(defaultTabData.branding);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [dbTrackTabs, setDbTrackTabs] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/track-tabs');
      const data = await res.json();
      setDbTrackTabs(Array.isArray(data) ? data : []);
      const tabData = (Array.isArray(data) ? data : []).find((t: any) => t.tabId === activeTab);
      if (tabData?.data) {
        setFormData({ ...defaultTabData[activeTab], ...tabData.data });
      } else {
        setFormData({ ...defaultTabData[activeTab] });
      }
    } catch (error) {
      console.error('Failed to fetch track tabs:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSwitchTab = (newTab: string) => {
    setActiveTab(newTab);
    setHasChanges(false);
    const tabData = dbTrackTabs.find((t: any) => t.tabId === newTab);
    if (tabData?.data) {
      setFormData({ ...defaultTabData[newTab], ...tabData.data });
    } else {
      setFormData({ ...defaultTabData[newTab] });
    }
  };

  const handleChange = (key: string, val: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: val }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/track-tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tabId: activeTab, data: formData }),
      });
      if (res.ok) {
        showStatus('success', `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content saved successfully!`);
        setHasChanges(false);
        const updatedRes = await fetch('/api/track-tabs');
        const updatedData = await updatedRes.json();
        setDbTrackTabs(Array.isArray(updatedData) ? updatedData : []);
      } else {
        showStatus('error', 'Failed to save changes');
      }
    } catch (e) {
      showStatus('error', 'Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Reset all fields to default values? This won\'t save until you click Save.')) return;
    setFormData({ ...defaultTabData[activeTab] });
    setHasChanges(true);
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const currentTabConfig = tabsList.find(t => t.id === activeTab)!;
  const TabIcon = currentTabConfig.icon;

  return (
    <div className="flex flex-col gap-5 pb-20">
      {/* Status message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className={`px-4 py-3 rounded-xl flex items-center gap-3 text-[13px] font-medium border ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-red-50 text-red-700 border-red-100'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Switcher + Actions */}
      <div className="bg-white rounded-2xl border border-gray-100/80 p-1.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-1">
            {tabsList.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSwitchTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 text-gray-500 hover:text-gray-700 border border-gray-200/80 bg-white rounded-xl text-[12px] font-medium transition-all flex items-center gap-1.5 hover:bg-gray-50"
            >
              <RefreshCw size={13} />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all flex items-center gap-1.5 ${
                hasChanges
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              {saving ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-5">
          <div className="h-20 bg-gray-100 rounded-2xl" />
          <div className="h-64 bg-gray-100 rounded-2xl" />
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Active Tab Header */}
          <div className="bg-white rounded-2xl border border-gray-100/80 p-5 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: currentTabConfig.color }}
            >
              <TabIcon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-semibold text-gray-900 capitalize">{currentTabConfig.label} Page</h2>
              <p className="text-[12px] text-gray-400">Edit the content for the {currentTabConfig.label} track tab page.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: currentTabConfig.color }} />
              <span className="text-[11px] font-mono text-gray-400">{currentTabConfig.color}</span>
            </div>
          </div>

          {/* Section: Hero */}
          <SectionCard title="Hero Section" icon={<Type size={14} />} color={currentTabConfig.color}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput label="Badge Text" value={formData.badgeText || ''} onChange={(v: string) => handleChange('badgeText', v)} placeholder="Trust, Innovation, Prosperity" />
              <SimpleInput label="Accent Color" value={formData.accentColor || ''} onChange={(v: string) => handleChange('accentColor', v)} placeholder="#00A3FF" description="HEX color for buttons" />
            </div>
            <SimpleInput label="Headline" value={formData.headline || ''} onChange={(v: string) => handleChange('headline', v)} placeholder="Effortless banking, \n total financial ease" description="Use \n for line breaks" />
            <SimpleTextarea label="Description" value={formData.description || ''} onChange={(v: string) => handleChange('description', v)} placeholder="Your financial needs evolve..." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput label="Button Text" value={formData.buttonText || ''} onChange={(v: string) => handleChange('buttonText', v)} placeholder="Open an Account" />
              <SimpleInput label="Button URL" value={formData.buttonUrl || ''} onChange={(v: string) => handleChange('buttonUrl', v)} placeholder="/contact" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput label="Stat Value" value={formData.statValue || ''} onChange={(v: string) => handleChange('statValue', v)} placeholder="135K+" />
              <SimpleInput label="Stat Label" value={formData.statLabel || ''} onChange={(v: string) => handleChange('statLabel', v)} placeholder="New clients" />
            </div>
          </SectionCard>

          {/* Section: Gallery */}
          <SectionCard title="Gallery Cards" icon={<ImageIcon size={14} />} color="#374151">
            <GalleryCardEditor
              label="Card 1"
              imageValue={formData.card1Image || ''}
              textValue={formData.card1Label || ''}
              onImageChange={(v: string) => handleChange('card1Image', v)}
              onTextChange={(v: string) => handleChange('card1Label', v)}
              placeholder="Mobile banking\nat your fingertips"
            />
            <GalleryCardEditor
              label="Card 3"
              imageValue={formData.card3Image || ''}
              textValue={formData.card3Label || ''}
              onImageChange={(v: string) => handleChange('card3Image', v)}
              onTextChange={(v: string) => handleChange('card3Label', v)}
              placeholder="Advising our\ncustomers 24/7"
            />
            <GalleryCardEditor
              label="Card 4"
              imageValue={formData.card4Image || ''}
              textValue={formData.card4Label || ''}
              onImageChange={(v: string) => handleChange('card4Image', v)}
              onTextChange={(v: string) => handleChange('card4Label', v)}
              placeholder="Custom cards"
            />
          </SectionCard>

          {/* Section: Thematic Card */}
          <SectionCard title="Thematic Card" icon={<CreditCard size={14} />} color={currentTabConfig.color}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput label="Top Badge" value={formData.card2Badge || ''} onChange={(v: string) => handleChange('card2Badge', v)} placeholder="Haven" />
              <SimpleInput label="Subtitle" value={formData.card2Subtitle || ''} onChange={(v: string) => handleChange('card2Subtitle', v)} placeholder="Credit Card" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SimpleInput label="Main Value" value={formData.card2Value || ''} onChange={(v: string) => handleChange('card2Value', v)} placeholder="5769" />
              <SimpleInput label="Badge (Bottom Right)" value={formData.card2Role || ''} onChange={(v: string) => handleChange('card2Role', v)} placeholder="VISA / PRO" />
            </div>
            <SimpleInput label="Name (Bottom Left)" value={formData.card2Name || ''} onChange={(v: string) => handleChange('card2Name', v)} placeholder="Alan\nWinklevoss" description="Use \n for line breaks" />

            <div className="border-t border-gray-100 pt-4 mt-2 space-y-4">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Profile Bar</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SimpleInput label="Profile Name" value={formData.profileName || ''} onChange={(v: string) => handleChange('profileName', v)} placeholder="Jerry Wick" />
                <SimpleInput label="Profile Desc" value={formData.profileDesc || ''} onChange={(v: string) => handleChange('profileDesc', v)} placeholder="$329,394.23" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Avatar</p>
                <div className="w-28">
                  <ImageUploadInput value={formData.profileAvatar || ''} onChange={(v: string) => handleChange('profileAvatar', v)} />
                </div>
              </div>
            </div>
          </SectionCard>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────── */

function SectionCard({ title, icon, color, children }: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h3 className="text-[14px] font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

function GalleryCardEditor({ label, imageValue, textValue, onImageChange, onTextChange, placeholder }: {
  label: string; imageValue: string; textValue: string; onImageChange: (v: string) => void; onTextChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50/60 border border-gray-100/80 rounded-xl">
      <div className="w-full md:w-1/3">
        <p className="text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">{label} Image</p>
        <ImageUploadInput value={imageValue} onChange={onImageChange} />
      </div>
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <SimpleInput label={`${label} Label`} value={textValue} onChange={onTextChange} placeholder={placeholder} description="Use \n for line breaks" />
      </div>
    </div>
  );
}