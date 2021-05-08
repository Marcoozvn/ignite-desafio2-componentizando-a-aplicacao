import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SidebarProps {
  selectedGenreId: number;
  handleSelectGenre: (id: number) => void;
}

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export const SideBar: React.FC<SidebarProps> = ({ handleSelectGenre, selectedGenreId }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}