import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Card = {
  title: string
  description: string
  url: string
  ts: number
  id: string
}

type GetImagesResponse = {
  data: Card[]
  after: string
}

export default function Home(): JSX.Element {
  async function fetchImages({ pageParam = null }): Promise<GetImagesResponse> {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam
      }
    })
    return data
  }
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: lastPage => lastPage?.after || null
    }
  );

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat()
    })
    return formatted
  }, [data]);

  if (isError) {
    return <Error />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
