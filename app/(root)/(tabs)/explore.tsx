import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
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

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: CoursesData,
    loading: CoursesLoading,
    refetch,
  } = useAppwrite({
    fn: getCourses,
    params: { query: params.query!, filter: params.filter!, limit: 20 },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/Courses/${id}`);

  useEffect(() => {
    refetch({ query: params.query!, filter: params.filter!, limit: 20 });
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
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Course
              </Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>
            <Search />
            <View className="mt-2">
              <Filters />
              <Text className="text-xl font-rubik text-black-300 mt-5">
                Found {CoursesData?.length} courses
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
