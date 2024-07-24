import React, { useEffect, useState } from 'react';
import { getNews } from '../../core/store/news/news.actions';
import { useAppDispatch } from '../../core/store/store';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { Box, Grid, Link, Typography, useTheme } from '@mui/material';
import { tokens } from '../../assets/theme';

export const NewsPage: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [newsItem, setNewsItem] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    setNewsItem(news.slice(0, 10));
  }, [news]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [newsItem, page]);

  const handleScroll = (event: any) => {
    if (
      event.target.documentElement.scrollHeight -
        (event.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      loadMoreNews();
    }
  };

  const loadMoreNews = () => {
    const nextPage = page + 1;
    const newItems = news.slice(page * 10, nextPage * 10);
    if (newItems.length > 0) {
      setNewsItem((prevNewsItem) => [...prevNewsItem, ...newItems]);
      setPage(nextPage);
    }
  };

  const renderNewsBlock = newsItem.map((element: any) => (
    <Grid
      container
      key={element.id}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 16px',
        marginBottom: '32px',
        minHeight: '180px',

        backgroundColor: `${
          theme.palette.mode === 'light'
            ? colors.primary.DEFAULT
            : colors.primary[600]
        }`,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: '12px',
        '& .MuiPaper-root': {
          backgroundColor: 'transparent !important',
          boxShadow: 'none !important',
          backgroundImage: 'none !important',
        },
      }}
    >
      <Grid item xs={3} md={3} lg={3} sx={{ minWidth: '300px' }}>
        <img src={element.imageurl} alt={element.category} />
      </Grid>
      <Grid item xs={9} md={9} lg={9}>
        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant='h3'>{element.title}</Typography>
        </Box>

        <Box>
          <Typography variant='body1'>{element.body}</Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        sx={{ textAlign: 'center', marginTop: '20px' }}
      >
        <Typography variant='h4'>
          <Link href={element.url} sx={{ color: colors.blue }}>
            Read more
          </Link>
        </Typography>
      </Grid>
    </Grid>
  ));

  return (
    <Grid
      sx={{
        padding: '32px',
        '& a': {
          textDecoration: 'none',
          color: `${
            theme.palette.mode === 'light'
              ? colors.black.DEFAULT
              : colors.white.DEFAULT
          }`,
        },
      }}
    >
      <Grid sx={{ textAlign: 'center', marginBottom: '32px' }}>
        <Typography variant='h2'>News</Typography>
      </Grid>
      <Grid> {renderNewsBlock}</Grid>
    </Grid>
  );
};
