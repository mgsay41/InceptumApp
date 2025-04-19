import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getCourses, getFeaturedCourses } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: FeaturedCoursesData, loading: FeaturedCoursesLoading } =
    useAppwrite({ fn: getFeaturedCourses });
  const {
    data: CoursesData,
    loading: CoursesLoading,
    refetch,
  } = useAppwrite({
    fn: getCourses,
    params: { query: params.query!, filter: params.filter!, limit: 6 },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/Courses/${id}`);

  useEffect(() => {
    refetch({ query: params.query!, filter: params.filter!, limit: 6 });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={CoursesData || []}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id || String(Math.random())}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          CoursesLoading ? (
            <ActivityIndicator
              size={"large"}
              className="text-primary-300 mt-5"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Welcome,{" "}
                  </Text>
                  <Text className="text-base font-rubikMedium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik font-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik font-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {FeaturedCoursesLoading ? (
                <ActivityIndicator
                  size={"large"}
                  className="text-primary-300 mt-5"
                />
              ) : !FeaturedCoursesData || FeaturedCoursesData.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={FeaturedCoursesData || []}
                  keyExtractor={(item) => item.$id || String(Math.random())}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="flex gap-5 mt-5"
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                />
              )}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik font-bold text-black-300">
                Courses
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik font-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
            {/* <View className="flex flex-row gap-5 mt-5">
              <Card />
              <Card />
            </View> */}
          </View>
        }
      />
    </SafeAreaView>
  );
}
