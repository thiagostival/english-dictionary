import { useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { QueryFunctionContext, useQuery } from 'react-query';

import { IoIosClose, IoMdVolumeHigh } from 'react-icons/io';
import {
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdContentCopy,
} from 'react-icons/md';

// STYLES
import {
  GroupButtons,
  HeaderMobileSectionLeft,
  ContentSectionLeft,
  WrapperSectionLeft,
  Text,
  Group,
  Meanings,
  Overlay,
} from './styles';

// COMPONENTS
import { Button } from '../Button';
import { Loading } from '../Loading';

// SERVICES
import { AxiosError } from 'axios';
import { isAxiosError } from '../../services/api';
import { getWord } from '../../services/endpoints';

// CONTEXT
import { useGlobal } from '../../contexts/GlobalContext';

// TYPES
import { IErrorGetWord } from '../../services/types';

export function SectionLeft() {
  const theme = useTheme();
  const { favorites, selectedWord, handleFavorite, handleSetSelectedWord } =
    useGlobal();

  const [errorMessage, setErrorMessage] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGetWord = async ({
    queryKey,
  }: QueryFunctionContext<string, any>) => {
    const { apiCall } = getWord();

    const { data } = await apiCall(queryKey[0]);
    const find = data.find((r) => !!r.phonetics.length) || data?.[0];

    return {
      ...find,
      phonetics:
        find?.phonetics?.find?.((p) => p?.audio && p?.text) ||
        find?.phonetics?.[0] ||
        {},
      meanings: find?.meanings?.map((m) => {
        return {
          partOfSpeech: m?.partOfSpeech,
          definition: m.definitions.find((d) => !!d.definition)?.definition,
        };
      }),
    };
  };

  const { data, isFetching } = useQuery(selectedWord, handleGetWord, {
    enabled: !!selectedWord,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    onError: (err: AxiosError<IErrorGetWord>) => {
      let message = {
        title: 'Failed to get word',
        description: 'There was a problem in get word. Please try again later!',
      };

      if (isAxiosError(err)) {
        message = {
          title: err?.response?.data?.title || message.title,
          description: err?.response?.data?.message || message.description,
        };

        setErrorMessage(message.description);
      }
    },
  });

  function handleCopy(word = '') {
    navigator.clipboard.writeText(word);
  }

  function handlePlayPause() {
    if (audioRef?.current?.paused) {
      audioRef?.current?.play?.();
    } else {
      audioRef?.current?.pause?.();
    }
  }

  return (
    <>
      <Overlay show={!!selectedWord} />

      <WrapperSectionLeft>
        <HeaderMobileSectionLeft>
          <Button
            icon={<IoIosClose size={35} />}
            onlyIcon
            variant="unstyled"
            style={{ color: theme.colors.blue[700] }}
            onClick={() => handleSetSelectedWord('')}
          />
        </HeaderMobileSectionLeft>

        {isFetching ? (
          <Loading />
        ) : (
          <ContentSectionLeft>
            {data ? (
              <>
                <Text
                  size="6xl"
                  color="blue.900"
                  style={{ textTransform: 'capitalize' }}
                >
                  {data?.word}
                </Text>

                <Group>
                  <Text color="blue.900" size="md">
                    [ {data?.phonetics?.text?.replaceAll('/', '')} ]
                  </Text>

                  <GroupButtons>
                    {data?.phonetics?.audio && (
                      <Button
                        icon={<IoMdVolumeHigh />}
                        iconSide="top"
                        onClick={handlePlayPause}
                      >
                        <Text>Listen</Text>
                      </Button>
                    )}

                    <Button
                      icon={
                        favorites.includes(data?.word) ? (
                          <MdOutlineFavorite />
                        ) : (
                          <MdOutlineFavoriteBorder />
                        )
                      }
                      iconSide="top"
                      onClick={() => handleFavorite(data?.word)}
                    >
                      <Text>Favorite</Text>
                    </Button>

                    <Button
                      icon={<MdContentCopy />}
                      iconSide="top"
                      onClick={() => handleCopy('hello')}
                    >
                      <Text>Copy</Text>
                    </Button>
                  </GroupButtons>

                  <Meanings>
                    <Text color="blue.900" size="md" weight="bold">
                      Meanings
                    </Text>

                    {!!data?.meanings?.length &&
                      data?.meanings.map((mean, index) => (
                        <Text
                          key={`${mean?.partOfSpeech}-${index}`}
                          color="blue.900"
                          size="xs"
                          className="means"
                        >
                          <b>{mean?.partOfSpeech}</b>: {mean?.definition}
                        </Text>
                      ))}
                  </Meanings>
                </Group>

                {data?.phonetics?.audio && (
                  <audio ref={audioRef} src={data?.phonetics?.audio}>
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                )}
              </>
            ) : (
              <span className="error">
                {errorMessage || 'Please Select a Word'}
              </span>
            )}
          </ContentSectionLeft>
        )}
      </WrapperSectionLeft>
    </>
  );
}
