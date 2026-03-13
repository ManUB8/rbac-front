import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '../../../../../assets/svg/icon/close.svg';
import SearchOrder from '../../../../../shared/components/search/SearchOrder';
import type {
  ICategoryItem,
  ISubCategory,
} from '../../interface/MadterSku.interface';

type ISubCategoryItem = ISubCategory;

type ISubWithParent = ISubCategoryItem & {
  _parentCategory: ICategoryItem;
};

export interface ICategoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: ICategoryItem[];

  // 👇 รับเป็น id ตรง ๆ จากฟอร์ม
  currentCategoryId?: string;
  currentSubCategoryId?: string;

  onSelect?: (payload: {
    category: ICategoryItem;
    subCategory: ISubCategoryItem;
  }) => void;
}

const CategoryModal: React.FC<ICategoryModalProps> = ({
  isOpen,
  setIsOpen,
  categories,
  currentCategoryId,
  currentSubCategoryId,
  onSelect,
}) => {
  const [searchCategories, setSearchCategories] = useState('');
  const [activeCategory, setActiveCategory] = useState<ICategoryItem | null>(null);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<ISubCategoryItem | null>(null);

  // ---------- init state ตอนเปิด modal ----------
  useEffect(() => {
    if (!isOpen) return;

    setSearchCategories('');

    if (!currentCategoryId) {
      setActiveCategory(null);
      setSelectedSub(null);
      setSelectedSubId(null);
      return;
    }

    // หา category เต็มจาก id
    const foundCat =
      categories.find((c) => c.category_id === currentCategoryId) ?? null;

    setActiveCategory(foundCat);

    if (foundCat && currentSubCategoryId) {
      const foundSub =
        foundCat.sub_category?.find(
          (s) => s.sub_category_id === currentSubCategoryId,
        ) ?? null;

      setSelectedSub(foundSub);
      setSelectedSubId(foundSub?.sub_category_id ?? null);
    } else {
      setSelectedSub(null);
      setSelectedSubId(null);
    }
  }, [isOpen, currentCategoryId, currentSubCategoryId, categories]);

  const handleClose = () => {
    setIsOpen(false);
    setActiveCategory(null);
    setSelectedSubId(null);
    setSelectedSub(null);
    setSearchCategories('');
  };

  const handleBackToCategory = () => {
    setSelectedSub(null);
    setSelectedSubId(null);
  };

  const handleBackToRoot = () => {
    setActiveCategory(null);
    setSelectedSubId(null);
    setSelectedSub(null);
  };

  const handleClickCategory = (cat: ICategoryItem) => {
    setActiveCategory(cat);
    setSelectedSubId(null);
    setSelectedSub(null);
  };

  const handleClickSub = (sub: ISubCategoryItem) => {
    if (!activeCategory) return;
    setSelectedSubId(sub.sub_category_id);
    setSelectedSub(sub);
    onSelect?.({ category: activeCategory, subCategory: sub });
  };

  const handleClickSubAny = (sub: ISubCategoryItem, cat: ICategoryItem) => {
    setActiveCategory(cat);
    setSelectedSubId(sub.sub_category_id);
    setSelectedSub(sub);
    onSelect?.({ category: cat, subCategory: sub });
    setSearchCategories('');
  };

  const keyword = searchCategories.trim().toLowerCase();

  const listData = useMemo(() => {
    // search mode → หา sub ทุกหมวด
    if (keyword) {
      const result: ISubWithParent[] = [];
      categories.forEach((cat) => {
        (cat.sub_category ?? []).forEach((sub) => {
          if (sub.sub_category_name.toLowerCase().includes(keyword)) {
            result.push({ ...sub, _parentCategory: cat });
          }
        });
      });
      return result;
    }

    // ปกติ
    if (!activeCategory) return categories;
    return activeCategory.sub_category ?? [];
  }, [categories, activeCategory, keyword]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2.5,
            p: 3,
            width: 720,
            maxWidth: 'none',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'surfaceContainerLowest',
            '&:hover': { bgcolor: 'surfaceContainerLow' },
          }}
        >
          <img src={CloseIcon} alt="close" />
        </IconButton>

        <Typography variant="h5">หมวดหมู่สินค้า</Typography>

        <Box sx={{ width: 48 }} />
      </Box>

      <DialogContent
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 0,
        }}
      >
        <Stack spacing={2}>
          {/* search */}
          <SearchOrder
            searchValue={searchCategories}
            handleChangeSearch={(e: any) => {
              setSearchCategories(e.target.value);
            }}
          />

          {/* breadcrumbs */}
          <Box
            sx={(t) => ({
              borderRadius: 1,
              px: 2,
              py: 1.25,
              bgcolor: t.palette.grey[100],
            })}
          >
            <Breadcrumbs separator="/" aria-label="breadcrumb">
              <Link
                underline={activeCategory ? 'hover' : 'none'}
                onClick={activeCategory ? handleBackToRoot : undefined}
                color="primary.main"
              >
                <Typography variant="subtitle1" component="span" sx={{ fontWeight: 500 }}>
                  เลือกหมวดหมู่
                </Typography>
              </Link>

              {activeCategory && !selectedSub && (
                <Typography variant="subtitle1" color="text.primary">
                  {activeCategory.category_name}
                </Typography>
              )}

              {activeCategory && selectedSub && (
                <Link underline="hover" onClick={handleBackToCategory} color="primary.main">
                  <Typography variant="subtitle1" component="span">
                    {activeCategory.category_name}
                  </Typography>
                </Link>
              )}

              {activeCategory && selectedSub && (
                <Typography variant="subtitle1" color="text.primary">
                  {selectedSub.sub_category_name}
                </Typography>
              )}
            </Breadcrumbs>
          </Box>

          {/* list */}
          <Box
            sx={{
              mt: 1,
              borderRadius: 1,
              border: (t) => `1px solid ${t.palette.divider}`,
              overflow: 'hidden',
            }}
          >
            <List disablePadding>
              {listData.map((item: any) => {
                const isSearchItem =
                  (item as ISubWithParent)._parentCategory !== undefined;

                const isSub = isSearchItem || !!activeCategory;

                const key = isSub ? item.sub_category_id : item.category_id;
                const isSelected = isSub && item.sub_category_id === selectedSubId;
                const label = isSub ? item.sub_category_name : item.category_name;

                const handleClick = () => {
                  if (isSearchItem) {
                    const subWithParent = item as ISubWithParent;
                    handleClickSubAny(subWithParent, subWithParent._parentCategory);
                  } else if (activeCategory) {
                    handleClickSub(item as ISubCategoryItem);
                  } else {
                    handleClickCategory(item as ICategoryItem);
                  }
                };

                return (
                  <ListItemButton
                    key={key}
                    onClick={handleClick}
                    sx={(t) => ({
                      height: 56,
                      px: 2.5,
                      borderBottom: `1px solid ${t.palette.divider}`,
                      bgcolor: isSelected
                        ? t.palette.secondaryContainer
                        : t.palette.background.paper,
                      '&:last-of-type': {
                        borderBottom: 'none',
                      },
                    })}
                  >
                    <ListItemText
                      primary={<Typography variant="subtitle1">{label}</Typography>}
                    />
                    {!isSub && <ArrowForwardIosIcon fontSize="small" />}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;