import { Herb } from './types';

export const HERB_DATABASE: Herb[] = [
  {
    id: '1',
    name: 'زعفران (Saffron)',
    scientificName: 'Crocus sativus',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'caution',
    description: 'زعفران گیاهی است که به عنوان ادویه و دارو استفاده می‌شود. طبع آن گرم و خشک است و نشاط آور می‌باشد.',
    properties: ['ضد افسردگی', 'تقویت قلب', 'قاعده‌آور', 'آنتی‌اکسیدان'],
    preparationMethods: ['دم‌کرده', 'پودر در غذا', 'شربت'],
    drugInteractions: ['داروهای رقیق‌کننده خون', 'داروهای فشار خون']
  },
  {
    id: '2',
    name: 'گل گاوزبان (Borage)',
    scientificName: 'Echium amoenum',
    image: 'https://images.unsplash.com/photo-1611078813455-b4e2e5f118cd?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'safe',
    description: 'گیاهی آرام‌بخش با طبع گرم و تر که برای تقویت اعصاب و رفع استرس بسیار مفید است.',
    properties: ['آرام‌بخش', 'تصفیه کننده خون', 'مدر', 'ضد سرفه'],
    preparationMethods: ['دمنوش با لیمو عمانی', 'عصاره'],
    drugInteractions: ['داروهای سیستم عصبی مرکزی']
  },
  {
    id: '3',
    name: 'نعناع (Mint)',
    scientificName: 'Mentha',
    image: 'https://images.unsplash.com/photo-1628556285620-3023e387c263?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'safe',
    description: 'گیاهی معطر با طبع گرم و خشک، بسیار موثر در درمان مشکلات گوارشی و نفخ.',
    properties: ['ضد نفخ', 'مسکن درد معده', 'خنک‌کننده', 'ضد اسپاسم'],
    preparationMethods: ['عرق نعناع', 'دمنوش', 'استفاده تازه'],
    drugInteractions: ['داروهای کاهش اسید معده']
  },
  {
    id: '4',
    name: 'آویشن (Thyme)',
    scientificName: 'Thymus vulgaris',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'caution',
    description: 'گیاهی با خاصیت آنتی‌باکتریال قوی، مفید برای عفونت‌های تنفسی و سرفه.',
    properties: ['ضد سرفه', 'آنتی‌باکتریال', 'خلط‌آور', 'ضد قارچ'],
    preparationMethods: ['دمنوش', 'بخور', 'شربت'],
    drugInteractions: ['داروهای هورمونی (به دلیل اثرات استروژنی ضعیف)']
  },
  {
    id: '5',
    name: 'بابونه (Chamomile)',
    scientificName: 'Matricaria chamomilla',
    image: 'https://images.unsplash.com/photo-1608831540955-35094d48694a?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'safe',
    description: 'گیاهی با گل‌های کوچک سفید و زرد که برای آرامش اعصاب و بهبود خواب بی‌نظیر است.',
    properties: ['آرام‌بخش', 'ضد التهاب', 'بهبود خواب', 'ضد اسپاسم'],
    preparationMethods: ['دمنوش', 'روغن بابونه', 'بخور'],
    drugInteractions: ['داروهای خواب‌آور', 'رقیق‌کننده‌های خون']
  },
  {
    id: '6',
    name: 'رازیانه (Fennel)',
    scientificName: 'Foeniculum vulgare',
    image: 'https://images.unsplash.com/photo-1615486171448-4afd37105281?auto=format&fit=crop&q=80&w=800',
    safetyLevel: 'caution',
    description: 'گیاهی با طبع گرم و خشک که سرشار از هورمون‌های زنانه (فیتواستروژن) است.',
    properties: ['تنظیم هورمون', 'شیر افزا', 'ضد نفخ', 'کاهش درد قاعدگی'],
    preparationMethods: ['عرق رازیانه', 'دمنوش', 'جویدن دانه'],
    drugInteractions: ['داروهای هورمونی', 'داروهای صرع']
  }
];
