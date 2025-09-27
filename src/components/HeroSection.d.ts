import React from 'react';

interface HeroSectionProps {
  onSearch?: () => void;
}

declare const HeroSection: React.FC<HeroSectionProps>;

export default HeroSection;