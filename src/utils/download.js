import twitchApi from './twitch-api';

function createPayload(clipId) {
  return {
    operationName: 'ClipsDownloadButton',
    variables: {
      slug: clipId,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: '6e465bb8446e2391644cf079851c0cb1b96928435a240f07ed4b240f0acc6f1b',
      },
    },
  };
}

function createUrl(video, signature, value) {
  return `${video}?sig=${signature}&token=${encodeURIComponent(value)}`;
}

export default async function getClipMetaData(clips) {
  const payloads = clips.map(({ id }) => createPayload(id));
  const { data } = await twitchApi.graphqlQuery(payloads);

  return data.map(({ data: _data }, i) => {
    const { playbackAccessToken } = _data.clip;
    const video = _data.clip.videoQualities[0].sourceURL;
    return {
      url: createUrl(video, playbackAccessToken.signature, playbackAccessToken.value),
      meta: clips[i],
    };
  });
}
