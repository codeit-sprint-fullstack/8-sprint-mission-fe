'use client';

import styles from '@/styles/components/DetailArticleCard.module.scss';

import HeartTag from '@/components/HeartTag';
import DropDown from '@/components/DropDown.jsx';
import ic_profile from '/public/icons/ic_profile.svg';
import Image from 'next/image';
import { convertTz } from '@/lib/dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const DetailArticleCard = ({ id = '' }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const getDetailArticle = async () => {
    const res = await api(`/articles/${id}`);
    return res.json();
  };

  const {
    data: article,
    isLoading: isArticleLoading,
    error: articleError,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: getDetailArticle,
  });

  const deleteArticle = async (id) => {
    const res = await api(`/articles/${id}`, {
      method: 'DELETE',
    });

    return res.json();
  };

  const deleteArticleMutate = useMutation({
    mutationFn: (id) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/article');
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleEdit = () => {
    router.push(`/article/edit/${id}`);
  };

  const handleDelete = () => {
    deleteArticleMutate.mutate(id);
  };

  if (articleError) return <p>{articleError.message}</p>;
  if (isArticleLoading) return <LoadingSpinner fullscreen={true} />;

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{article?.data.title}</div>
          <DropDown
            type="modify"
            handlers={{
              edit: handleEdit,
              delete: handleDelete,
            }}
          />
        </div>
        <div className={styles.userAndFavorite}>
          <div className={styles.userInfo}>
            <Image src={ic_profile} alt="ic_profile" width={40} height={40} />
            <div className={styles.nameAndDate}>
              <div className={styles.name}>총명한판다</div>
              <div className={styles.date}>{convertTz(article?.data.createdAt)}</div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="34"
            viewBox="0 0 2 34"
            fill="none"
          >
            <path d="M1 0V34" stroke="#E5E7EB" />
          </svg>
          <HeartTag like={article?.data?.like} />
        </div>
      </div>
      <div className={styles.detail}>{article?.data.content}</div>
    </div>
  );
};

export default DetailArticleCard;
