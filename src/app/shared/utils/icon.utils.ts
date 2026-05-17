import { NavIcon, PrincipleCard, QuickLink } from '../../core/models/portfolio.model';

export function navIconPath(icon: NavIcon): string {
  const iconMap: Record<NavIcon, string> = {
    overview: 'M3 10.4 12 3l9 7.4v9.6a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    workbench: 'M5 5h14M5 12h14M5 19h14M8 5v14M16 5v14M12 5v14M5 8h14M5 16h14',
    tech: 'M4 7h16M4 12h8M4 17h12M15 12h5M19 17h1',
    architecture: 'M12 3v6m0 0 5 3m-5-3-5 3m5 3v6m0-6 5-3m-5 3-5-3',
    'case-studies': 'M4 6h16v12H4zM8 10h8M8 14h5',
    systems: 'M4 12h5l2 6 3-12 2 6h4',
    about: 'M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0',
    contact: 'M4 7h16v10H4zm0 0 8 6 8-6'
  };

  return iconMap[icon];
}

export function principleIconPath(icon: PrincipleCard['icon']): string {
  const iconMap = {
    code: 'M8 8 4 12l4 4M16 8l4 4-4 4M13 5l-2 14',
    performance: 'M12 3v6m0 0 4 4m-4-4-4 4M5 19h14',
    dx: 'M8 17h8M6 7h12M7 7l5 5-5 5',
    solver: 'M12 4 7 8v6l5 4 5-4V8zM9.5 11h5',
    architecture: 'M4 8h16M4 16h16M8 8v8M16 8v8',
    delivery: 'M3 12h14l4-6H7zm0 0 4 6h14'
  } as const;

  return iconMap[icon];
}

export function quickLinkIconPath(icon: QuickLink['icon']): string {
  const iconMap: Record<QuickLink['icon'], string> = {
    github:
      'M12 .5C5.648.5.5 5.67.5 12.045c0 5.101 3.292 9.427 7.86 10.955.574.108.783-.25.783-.555 0-.273-.01-1-.014-1.963-3.197.698-3.873-1.549-3.873-1.549-.523-1.336-1.277-1.69-1.277-1.69-1.045-.717.078-.703.078-.703 1.157.082 1.767 1.194 1.767 1.194 1.028 1.768 2.695 1.258 3.353.962.104-.75.402-1.258.731-1.546-2.552-.293-5.236-1.285-5.236-5.718 0-1.264.448-2.298 1.183-3.108-.119-.292-.513-1.468.113-3.06 0 0 .965-.31 3.162 1.188a10.925 10.925 0 0 1 2.88-.389c.977.004 1.961.132 2.88.389 2.195-1.498 3.159-1.188 3.159-1.188.627 1.592.233 2.768.115 3.06.737.81 1.182 1.844 1.182 3.108 0 4.444-2.687 5.422-5.246 5.709.414.357.783 1.061.783 2.139 0 1.543-.014 2.789-.014 3.168 0 .308.205.668.79.554 4.564-1.53 7.852-5.855 7.852-10.955C23.5 5.67 18.352.5 12 .5Z',
    linkedin:
      'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.83-2.05 3.77-2.05C21.64 8.59 23 11.03 23 14.23V21h-4v-5.99c0-1.43-.03-3.27-2-3.27-2 0-2.31 1.56-2.31 3.17V21h-4V9Z',
    cv: 'M12 3v11m0 0 4-4m-4 4-4-4M5 15v4h14v-4',
    email: 'M4 7h16v10H4zm0 0 8 6 8-6'
  };

  return iconMap[icon];
}
