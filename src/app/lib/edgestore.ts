"use client";

import { type EdgeStoreRouter } from "../pages/API/route";
import { createEdgeStoreProvider } from "../lib/edgestore/react";

export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>({
    maxConcurrentUploads: 2,
  });
