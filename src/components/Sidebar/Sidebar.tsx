import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarItem from '../../components/SidebarItem/SidebarItem';
import Badge from '../../components/Badge/Badge';

type BadgeType =  'product-design' | 'web-development' | 'graphic-design';

interface SidebarProps {
    activeButton: string;
    selected?: boolean;
    onSelectItem: (markdownPath: string) => void;
}

interface BadgeConfig {
    type: string;
    svg: JSX.Element;
}
  
interface ProjectMeta {
    title: string;
    badge: string;
    date: Date;
    tags: string[];
    path: string;
}

const badgeConfig: Record<BadgeType, BadgeConfig> = {
    'product-design': {
        type: 'red-badge',
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
            </svg>
        ),
    },
    'web-development': {
        type: 'blue-badge',
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
        ),
    },
    'graphic-design': {
        type: 'green-badge',
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '2vh' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
        ),
    },
};


const Sidebar: React.FC<SidebarProps> = ({ activeButton, onSelectItem }) => {
    const isVisible = ['graphic-design', 'web-development', 'product-design'].includes(activeButton);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [projects, setProjects] = useState<ProjectMeta[]>([]);

    let badgeType: BadgeType = 'product-design';
    if (['product-design', 'web-development', 'graphic-design'].includes(activeButton)) {
        badgeType = activeButton as BadgeType;
    }
    const { type, svg } = badgeConfig[badgeType];

    useEffect(() => {
        const importProjects = import.meta.glob('../../markdown/projects/*.md', { as: 'raw' });

        const loadProjects = async () => {
            const loadedProjects: ProjectMeta[] = [];
            for (const path in importProjects) {
                const fileContent = await importProjects[path]();
                const projectMeta = parseMarkdownMeta(fileContent, path);
                if (projectMeta && projectMeta.tags.includes(activeButton)) {
                    loadedProjects.push(projectMeta);
                }
            }
            const wipProjects = loadedProjects.filter(project => project.tags.includes('WIP'));
            const nonWipProjects = loadedProjects.filter(project => !project.tags.includes('WIP'));

            wipProjects.sort((a, b) => b.date.getTime() - a.date.getTime());
            nonWipProjects.sort((a, b) => b.date.getTime() - a.date.getTime());
            const sortedProjects = [...wipProjects, ...nonWipProjects];
            setProjects(sortedProjects);
            if (sortedProjects.length > 0) {
                setSelectedItem(0);
                onSelectItem(sortedProjects[0].path);
            }
        };

        loadProjects();
    }, [activeButton, onSelectItem]);

    const parseMarkdownMeta = (markdown: string, path: string): ProjectMeta | null => {
        const metaMatch = markdown.match(/---\n([\s\S]*?)\n---/);
        if (!metaMatch) return null;

        const metaContent = metaMatch[1];
        const metaObject = metaContent
            .split('\n')
            .reduce((acc, line) => {
                const [key, value] = line.split(':').map((str) => str.trim());
                if (key && value) {
                    acc[key] = value.replace(/["\[\]]/g, '').split(',').map((item) => item.trim());
                }
                return acc;
            }, {} as any);

        const projectMeta: ProjectMeta = {
            title: metaObject.title[0],
            badge: metaObject.badge[0],
            date: new Date(metaObject.date[0]),
            tags: metaObject.tags,
            path,
        };

        return projectMeta;
    };

    const handleItemClick = (id: number) => {
        setSelectedItem(id);
        const selectedPath = projects[id].path;
        onSelectItem(selectedPath);
    };

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="category-title">
                {type && svg && <Badge type={type}>{svg}</Badge>}
                <span>PROJECTS</span>
            </div>
            <div className="sidebarItem-container">
                {projects.map((project, index) => (
                    <SidebarItem
                        key={index}
                        title={project.title}
                        tag={project.badge}
                        onClick={() => handleItemClick(index)}
                        selected={selectedItem === index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;