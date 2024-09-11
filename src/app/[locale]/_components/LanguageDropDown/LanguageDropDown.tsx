import { ChevronDownIcon } from '@/components/ChevronDownIcon';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { COOKIES_LIFE } from '@/consts/cookiesConsts';
import { LanguageCode, languages } from '@/consts/languages';
import { Key } from 'react';
import i18nConfig from '../../../../../i18nConfig';
import styles from './LanguageDropDown.module.scss';

function LanguageDropDown() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as LanguageCode;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: Key) => {
    const locale = newLocale.toString();
    const date = new Date();
    date.setTime(date.getTime() + COOKIES_LIFE);
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push(`/${locale}${currentPathname}`);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${locale}`));
    }

    router.refresh();
  };

  const icons = {
    chevron: <ChevronDownIcon fill="currentColor" size={16} />,
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          data-testid="dropdownTrigger"
          disableRipple
          className={`h-[var(--navbar-height)] bg-transparent font-semibold text-base rounded-none justify-normal ${styles.dropdownTrigger}`}
          endContent={icons.chevron}
          radius="sm"
          variant="light"
        >
          {languages[currentLocale]}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Language selection"
        className="max-w-[300px] font-bold"
        itemClasses={{
          base: 'gap-4',
        }}
        onAction={handleChange}
      >
        <DropdownItem data-testid="dropdownItem_en" key="en">
          English
        </DropdownItem>
        <DropdownItem data-testid="dropdownItem_ru" key="ru">
          Русский
        </DropdownItem>
        <DropdownItem data-testid="dropdownItem_zh" key="zh">
          漢
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default LanguageDropDown;
