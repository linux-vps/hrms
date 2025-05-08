import React from "react";
import { Routes, Route } from "react-router-dom";

// import layout admin
import AdminLayout from "@/components/layouts/AdminLayout";

// import dashboard
import { Cms, Crm, Analytics, Sales, Hosting, Saas, Marketing, Ecommerce, Projects } from "@/views/dashboard/";
// import ecommerce
import { Checkout, Customers, Invoice, OrderDetail, Orders, ProductDetail, Products, Sellers, ShoppingCart } from "@/views/ecommerce/";
// import project
import { CreateProject, Kanban, ProjectDetail, ProjectLists } from "@/views/project/";
// import pages
import { NotFound, Faq, Pricing, Profile, Services, Starter } from "@/views/pages/";
// Import App
import Widgets from "@/views/app/Widgets";

// import index documentation
import { Introduction, ChangelogDocs, CreditsDocs, CustomizeDocs } from "@/views/documentation/";

// import components docs
import {
  AccordionDocs, AlertsDocs, AvatarDocs, BreadcrumbDocs, ButtonsDocs,
  BadgeDocs, CardsDocs, CarouselDocs, ChartDocs, CollapseDocs, DevicesDocs,
  DropdownsDocs, GridDocs, ListGroupDocs, MapDocs, ModalDocs,
  NavbarDocs, NotificationDocs, OffCanvasDocs, PaginationDocs, PopoversDocs,
  ProgressDocs, RibbonDocs, ScrollbarDocs, SpinnerDocs, SubmenuDocs, SweetAlertDocs, RatingDocs, FormatDocs, TabsDocs, TooltipsDocs
} from "@/views/documentation/components";
// import content docs

import { IconsDocs, TablesDocs, TypographyDocs } from "@/views/documentation/content";
// import forms docs

import { InputDocs, AdvanceDocs, InputLabelDocs, SelectDocs, CheckDocs, SwitchDocs, FormsDocs, InputGroupDocs } from "@/views/documentation/forms";

export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        {/* dashboard  */}
        <Route path="/*" element={<Cms />} />
        <Route exact path="/dashboard/cms/*" element={<Cms />} />
        <Route exact path="/dashboard/analytics/*" element={<Analytics />} />
        <Route exact path="/dashboard/saas/*" element={<Saas />} />
        <Route exact path="/dashboard/sales/*" element={<Sales />} />
        <Route exact path="/dashboard/crm/*" element={<Crm />} />
        <Route exact path="/dashboard/marketing/*" element={<Marketing />} />
        <Route exact path="/dashboard/projects/*" element={<Projects />} />
        <Route exact path="/dashboard/ecommerce/*" element={<Ecommerce />} />
        <Route exact path="/dashboard/hosting/*" element={<Hosting />} />

        {/* App */}
        <Route exact path="/app/widgets/*" element={<Widgets />} />

        {/* Ecommerce */}
        <Route exact path="/ecommerce/products/*" element={<Products />} />
        <Route exact path="/ecommerce/product-detail/*" element={<ProductDetail />} />
        <Route exact path="/ecommerce/orders/*" element={<Orders />} />
        <Route exact path="/ecommerce/order-detail/*" element={<OrderDetail />} />
        <Route exact path="/ecommerce/sellers/*" element={<Sellers />} />
        <Route exact path="/ecommerce/customers/*" element={<Customers />} />
        <Route exact path="/ecommerce/shopping-cart/*" element={<ShoppingCart />} />
        <Route exact path="/ecommerce/checkout/*" element={<Checkout />} />
        <Route exact path="/ecommerce/invoice/*" element={<Invoice />} />

        {/* Projects */}
        <Route exact path="/project/project-lists/*" element={<ProjectLists />} />
        <Route exact path="/project/project-detail/*" element={<ProjectDetail />} />
        <Route exact path="/project/kanban/*" element={<Kanban />} />
        <Route exact path="/project/create-project/*" element={<CreateProject />} />

        {/* Pages */}
        <Route exact path="/pages/profile/*" element={<Profile />} />
        <Route exact path="/pages/services/*" element={<Services />} />
        <Route exact path="/pages/faq/*" element={<Faq />} />
        <Route exact path="/pages/pricing/*" element={<Pricing />} />
        <Route exact path="/pages/404/*" element={<NotFound />} />
        <Route exact path="/pages/starter/*" element={<Starter />} />

        {/* index docs  */}
        <Route exact path="/start/introduction/*" element={<Introduction />} />
        <Route exact path="/start/customize/*" element={<CustomizeDocs />} />
        <Route exact path="/start/credits/*" element={<CreditsDocs />} />
        <Route exact path="/start/changelogs/*" element={<ChangelogDocs />} />

        {/* forms */}
        <Route exact path="/forms/advance/*" element={<AdvanceDocs />} />
        <Route exact path="/forms/input/*" element={<InputDocs />} />
        <Route exact path="/forms/inputlabel/*" element={<InputLabelDocs />} />
        <Route exact path="/forms/inputgroup/*" element={<InputGroupDocs />} />
        <Route exact path="/forms/select/*" element={<SelectDocs />} />
        <Route exact path="/forms/checkbox-radio/*" element={<CheckDocs />} />
        <Route exact path="/forms/switch-range/*" element={<SwitchDocs />} />
        <Route exact path="/forms/forms-example/*" element={<FormsDocs />} />

        {/* content */}
        <Route exact path="/content/typography/*" element={<TypographyDocs />} />
        <Route exact path="/content/tables/*" element={<TablesDocs />} />
        <Route exact path="/content/icons/*" element={<IconsDocs />} />

        {/* components */}
        <Route exact path="/components/accordion/*" element={<AccordionDocs />} />
        <Route exact path="/components/alerts/*" element={<AlertsDocs />} />
        <Route exact path="/components/avatar/*" element={<AvatarDocs />} />
        <Route exact path="/components/badge/*" element={<BadgeDocs />} />
        <Route exact path="/components/buttons/*" element={<ButtonsDocs />} />
        <Route exact path="/components/breadcrumb/*" element={<BreadcrumbDocs />} />
        <Route exact path="/components/cards/*" element={<CardsDocs />} />
        <Route exact path="/components/carousel/*" element={<CarouselDocs />} />
        <Route exact path="/components/chart/*" element={<ChartDocs />} />
        <Route exact path="/components/collapse/*" element={<CollapseDocs />} />
        <Route exact path="/components/devices/*" element={<DevicesDocs />} />
        <Route exact path="/components/dropdowns/*" element={<DropdownsDocs />} />
        <Route exact path="/components/grid/*" element={<GridDocs />} />
        <Route exact path="/components/list-group/*" element={<ListGroupDocs />} />
        <Route exact path="/components/map/*" element={<MapDocs />} />
        <Route exact path="/components/modal/*" element={<ModalDocs />} />
        <Route exact path="/components/navbar/*" element={<NavbarDocs />} />
        <Route exact path="/components/notification/*" element={<NotificationDocs />} />
        <Route exact path="/components/offcanvas/*" element={<OffCanvasDocs />} />
        <Route exact path="/components/pagination/*" element={<PaginationDocs />} />
        <Route exact path="/components/popovers/*" element={<PopoversDocs />} />
        <Route exact path="/components/progress/*" element={<ProgressDocs />} />
        <Route exact path="/components/ribbon/*" element={<RibbonDocs />} />
        <Route exact path="/components/scrollbar/*" element={<ScrollbarDocs />} />
        <Route exact path="/components/spinner/*" element={<SpinnerDocs />} />
        <Route exact path="/components/submenu/*" element={<SubmenuDocs />} />
        <Route exact path="/components/sweetalert/*" element={<SweetAlertDocs />} />
        <Route exact path="/components/tabs/*" element={<TabsDocs />} />
        <Route exact path="/components/tooltips/*" element={<TooltipsDocs />} />
        <Route exact path="/components/formatter/*" element={<FormatDocs />} />
        <Route exact path="/components/rating/*" element={<RatingDocs />} />
      </Routes>
    </AdminLayout>
  );
}
