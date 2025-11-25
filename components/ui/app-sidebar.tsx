"use client";

import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/ui/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "#",
    //   icon: IconDashboard,
    // },
    {
      title: "Quizzes",
      url: "/quiz",
      icon: IconListDetails,
    },
    // {
    //   title: "Estatísticas",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Resumos",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Cursos",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navClouds: [
    {
      title: "Criar Quiz",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Quiz Personalizado",
          url: "#",
        },
        {
          title: "Quiz Rápido",
          url: "#",
        },
      ],
    },
    {
      title: "Meus Quizzes",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Em Andamento",
          url: "#",
        },
        {
          title: "Concluídos",
          url: "#",
        },
      ],
    },
    {
      title: "Resumos",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Meus Resumos",
          url: "#",
        },
        {
          title: "Criar Resumo",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Biblioteca de Cursos",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Relatórios",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Assistente de Estudos",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/home">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Estuda Ai</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
