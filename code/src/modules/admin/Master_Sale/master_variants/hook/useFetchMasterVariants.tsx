import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as R from 'ramda';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import { useCallback, useRef, useState } from 'react';
import type { IProductVariantsData, IVariantItem } from '../interface/MasterVariants.interface';
import { getAllVariant } from '../service/MasterVariantsApi';


export function useFetchListVariantByProduct(product_id: string, enabled = false) {
    const query = useQuery<IProductVariantsData>({
        queryKey: ["list_variant_product", product_id],
        queryFn: async () => {
            const res = await getAllVariant(product_id);
            return res;
        },
        enabled: !!product_id && enabled,
    });

    const list_variants = query.data?.variants ?? [];
    const loading_variants = query.isLoading || query.isFetching;

    return {
        list_variants,
        loading_variants,
        refetch: query.refetch,
    };
}
