const config = useRuntimeConfig();

export const useScenes = () => {
  const scenesData = useState('scenesData', () => []);
  const scenesDataIsLoading = ref(false);
  const fetchScenesData = async () => {
    try {
      scenesDataIsLoading.value = true;

      const data = await $fetch(config.public.SCENES_URL);

      if (data.length) {
        const formattedData = JSON.parse(data);
        scenesData.value = formattedData;
      }

      scenesDataIsLoading.value = false;
    } catch (error) {
      scenesDataIsLoading.value = false;
      console.error(error);
    }
  };

  const lensesInAllScenes = computed(() => {
    const allSceneImages = scenesData?.value.map(item => Object.keys(item?.sceneImages)) ?? [];

    return allSceneImages?.length ? allSceneImages.reduce((a, b) => a.filter(c => b.includes(c))) : [];
  });

  return {
    fetchScenesData,
    lensesInAllScenes,
    scenesDataIsLoading,
    scenesData
  };
};
